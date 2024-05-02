import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  Clipboard,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {useMeeting, usePubSub} from '@videosdk.live/react-native-sdk';
import {
  CallEnd,
  Chat,
  Copy,
  EndForAll,
  Leave,
  MicOff,
  MicOn,
  Participants,
  ScreenShare,
  VideoOff,
  VideoOn,
} from '../../../assets/icons';
import colors from '../../../styles/colors';
import IconContainer from '../../../components/IconContainer';
import LocalParticipantPresenter from '../Components/LocalParticipantPresenter';
import Menu from '../../../components/Menu';
import MenuItem from '../Components/MenuItem';
import BottomSheet from '../../../components/BottomSheet';
import ParticipantListViewer from '../Components/ParticipantListViewer';
import ParticipantView from './ParticipantView';
import RemoteParticipantPresenter from './RemoteParticipantPresenter';
import VideosdkRPK from '../../../../VideosdkRPK';
import Toast from 'react-native-simple-toast';
import { useStore } from '../../../store/store';

const MemoizedParticipant = React.memo(
  ParticipantView,
  ({participantId}, {participantId: oldParticipantId}) =>
    participantId === oldParticipantId,
);
import {MemoizedParticipantGrid} from './ParticipantGrid';
import {useOrientation} from '../../../utils/useOrientation';
import ChatViewer from '../Components/ChatViewer';
import {convertRFValue} from '../../../styles/spacing';
import Blink from '../../../components/Blink';
import { t } from 'i18next';

export default function MeetingViewer({setlocalParticipantMode}) {
  
  const { changeStore, store } = useStore();
  const {
    localParticipant,
    participants,
    pinnedParticipants,
    localWebcamOn,
    localMicOn,
    leave,
    end,
    toggleWebcam,
    toggleMic,
    presenterId,
    localScreenShareOn,
    toggleScreenShare,
    meetingId,
    activeSpeakerId,
    changeMode,
    hlsState,
    startHls,
    stopHls,
    enableScreenShare,
    disableScreenShare,
  } = useMeeting({
    onError: data => {
      const {code, message} = data;
      Toast.show(`Error: ${code}: ${message}`);
    },
  });

  const leaveMenu = useRef();
  const bottomSheetRef = useRef();
  const hlsRef = useRef();
  const orientation = useOrientation();

  const currentUser = store.currentUser;
  const program = store.program;

  const [bottomSheetView, setBottomSheetView] = useState('');

  const participantIds = useMemo(() => {
    const pinnedParticipantId = [...pinnedParticipants.keys()].filter(
      participantId => {
        return participantId != localParticipant.id;
      },
    );
    // const regularParticipantIds = [...participants.keys()].filter(
    //   participantId => {
    //     return (
    //       ![...pinnedParticipants.keys()].includes(participantId) &&
    //       localParticipant.id != participantId
    //     );
    //   },
    // );
    const ids = [
      localParticipant?.id,
      ...pinnedParticipantId,
      // ...regularParticipantIds,
    ].slice(0, presenterId ? 2 : 6);

    if (activeSpeakerId) {
      if (!ids.includes(activeSpeakerId)) {
        ids[ids.length - 1] = activeSpeakerId;
      }
    }
    return ids;
  }, [
    participants,
    activeSpeakerId,
    pinnedParticipants,
    presenterId,
    localScreenShareOn,
  ]);

  useEffect(() => {
    if (hlsRef.current) {
      if (hlsState === 'HLS_STARTING' || hlsState === 'HLS_STOPPING') {
        hlsRef.current.start();
      } else {
        hlsRef.current.stop();
      }
    }
  }, [hlsState]);

  usePubSub('RAISE_HAND', {
    onMessageReceived: data => {
      const {senderName} = data;
      Toast.show(`${senderName} raised hand 🖐🏼`);
    },
  });

  useEffect(() => {
    if (Platform.OS == 'ios') {
      VideosdkRPK.addListener('onScreenShare', event => {
        if (event === 'START_BROADCAST') {
          enableScreenShare();
        } else if (event === 'STOP_BROADCAST') {
          disableScreenShare();
        }
      });

      return () => {
        // VideosdkRPK.removeSubscription('onScreenShare');
        VideosdkRPK.removeAllListeners('onScreenShare');
      };
    }
  }, []);

  const _handleHLS = () => {
    if (!hlsState || hlsState === 'HLS_STOPPED') {
      startHls({
        layout: {
          type: 'SPOTLIGHT',
          priority: 'PIN',
        },
        theme: 'DARK',
        orientation: 'landscape',
      });
    } else if (hlsState === 'HLS_PLAYABLE') {
      stopHls();
    }
  };

  
  // usePubSub(`CHANGE_MODE_${localParticipant.id}`, {
  usePubSub(`CHANGE_MODE`, {
    onMessageReceived: data => {
      const {message} = data;
      if (message.mode === 'VIEWER') {
        changeMode('VIEWER');
        setlocalParticipantMode('VIEWER');
      }
    },
  });

  useEffect(() => {
    if (hlsRef.current) {
      if (hlsState === 'HLS_STARTING' || hlsState === 'HLS_STOPPING') {
        hlsRef.current.start();
      } else {
        hlsRef.current.stop();
      }
    }
  }, [hlsState]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 16,
                color: colors.primary[100],
              }}>
              {program.title}
            </Text>
            
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          {hlsState === 'HLS_STARTED' ||
          hlsState === 'HLS_STOPPING' ||
          hlsState === 'HLS_PLAYABLE' ||
          hlsState === 'HLS_STARTING' ? (
            <Blink ref={hlsRef} duration={500}>
              <TouchableOpacity
                onPress={() => {
                  _handleHLS();
                }}
                activeOpacity={1}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 8,
                  padding: 10,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  backgroundColor: '#FF5D5D',
                }}>
                <Text
                  style={{
                    fontSize: convertRFValue(12),
                    color: colors.primary[100],
                  }}>
                  {hlsState === 'HLS_STARTED'
                    ? t('live_starting')
                    : hlsState === 'HLS_STOPPING'
                    ? t('live_stopping')
                    : hlsState === 'HLS_STARTING'
                    ? t('live_starting')
                    : hlsState === 'HLS_PLAYABLE'
                    ? t('stop_live')
                    : null}
                </Text>
              </TouchableOpacity>
            </Blink>
          ) : (
            <TouchableOpacity
              onPress={() => {
                _handleHLS();
              }}
              activeOpacity={1}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
                padding: 8,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: '#2B3034',
              }}>
              <Text
                style={{
                  fontSize: convertRFValue(12),
                  color: colors.primary[100],
                }}>
                {t('go_live')}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              setBottomSheetView('PARTICIPANT_LIST');
              bottomSheetRef.current.show();
            }}
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 8,
              width: 60,
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}>
            <Participants height={20} width={20} fill={colors.primary[100]} />
            <Text
              style={{
                fontSize: convertRFValue(12),
                color: colors.primary[100],
                marginLeft: 4,
              }}>
              {participants ? [...participants.keys()].length : 1}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Center */}
      <View
        style={{
          flex: 1,
          flexDirection: orientation == 'PORTRAIT' ? 'column' : 'row',
          marginVertical: 12,
        }}>
        {presenterId && !localScreenShareOn ? (
          <RemoteParticipantPresenter presenterId={presenterId} />
        ) : presenterId && localScreenShareOn ? (
          <LocalParticipantPresenter />
        ) : null}

        <MemoizedParticipantGrid
          participantIds={participantIds}
          isPresenting={presenterId != null}
        />
      </View>
      <Menu
        ref={leaveMenu}
        menuBackgroundColor={colors.primary[700]}
        placement="left">
        {/* <MenuItem
          title={t('leave')}
          description={t('only_you_will_leave')}
          icon={<Leave width={22} height={22} />}
          onPress={() => {
            leave();
          }}
        />
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary['600'],
          }}
        /> */}
        <MenuItem
          title={t('end')}
          description={t('end_call_for_all')}
          icon={<EndForAll />}
          onPress={() => {
            changeStore({ ...store, iscomplete: true });
            leave();
          }}
        />
      </Menu>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <IconContainer
          backgroundColor={'red'}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
          onPress={() => {
            leaveMenu.current.show();
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localMicOn ? colors.primary[100] : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <MicOn height={24} width={24} fill="#FFF" />
            ) : (
              <MicOff height={28} width={28} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localWebcamOn ? colors.primary[100] : 'transparent'}
          onPress={() => {
            toggleWebcam();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOn height={24} width={24} fill="#FFF" />
            ) : (
              <VideoOff height={36} width={36} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          onPress={() => {
            setBottomSheetView('CHAT');
            bottomSheetRef.current.show();
          }}
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          Icon={() => {
            return <Chat height={22} width={22} fill="#FFF" />;
          }}
        />
        {/* <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          onPress={() => {
            if (presenterId == null || localScreenShareOn) {
              Platform.OS === 'android'
                ? toggleScreenShare()
                : VideosdkRPK.startBroadcast();
            }
          }}
          Icon={() => {
            return <ScreenShare height={22} width={22} fill="#FFF" />;
          }}
        /> */}
      </View>
      <BottomSheet
        sheetBackgroundColor={'#2B3034'}
        draggable={false}
        radius={12}
        hasDraggableIcon
        closeFunction={() => {
          setBottomSheetView('');
        }}
        ref={bottomSheetRef}
        height={Dimensions.get('window').height * 0.5}>
        {bottomSheetView === 'CHAT' ? (
          <ChatViewer raiseHandVisible={false} />
        ) : bottomSheetView === 'PARTICIPANT_LIST' ? (
          <ParticipantListViewer participantIds={[...participants.keys()]} />
        ) : null}
      </BottomSheet>
    </>
  );
}
