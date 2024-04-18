import React, {useState} from 'react';
import {View, Platform, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Eye,
  FullScreen,
  RaiseHand,
  Chat,
  Cancel,
  ExitFullScreen,
  Play,
  Pause,
} from '../../../assets/icons';
import Orientation from 'react-native-orientation-locker';
import {useOrientation} from '../../../utils/useOrientation';
import {usePubSub, useMeeting} from '@videosdk.live/react-native-sdk';
import {useNavigation} from '@react-navigation/native';

export default function ControlsOverlay({
  playableDuration,
  setPause,
  progress,
  pause,
  seekTo,
  setisChatVisible,
  isChatVisible,
}) {
  const navigation = useNavigation();
  const {leave} = useMeeting({});

  const {participants} = useMeeting({});
  const {publish} = usePubSub('RAISE_HAND');

  const [hideOverlay, setHideOverlay] = useState(false);

  const deviceOrientation = useOrientation();

  const toHHMMSS = secs => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setHideOverlay(d => !d);
      }}
      style={{
        flex: 1,
        position: 'absolute',
        justifyContent: 'space-between',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
      {!hideOverlay ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 6,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  leave();
                  navigation.goBack();
                }}
                style={{
                  height: 30,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                }}>
                <Cancel />
              </TouchableOpacity>
              <View
                style={{
                  height: 26,
                  width: 46,
                  backgroundColor: '#FF5D5D',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  marginLeft: 14,
                }}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Live</Text>
              </View>
              <View
                style={{
                  height: 26,
                  width: 46,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: 10,
                }}>
                <Eye />
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {participants ? [...participants.keys()].length : 1}
                </Text>
              </View>
            </View>

            {deviceOrientation === 'LANDSCAPE' ? (
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // publish();
                    publish('SAMPLE_MESG');
                  }}
                  style={{
                    height: 40,
                    aspectRatio: 1,
                    marginRight: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RaiseHand fill={'#fff'} height={20} width={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setisChatVisible(val => !val);
                  }}
                  style={{
                    height: 40,
                    borderRadius: 6,
                    aspectRatio: 1,
                    marginHorizontal: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isChatVisible ? '#FFF' : 'rgba(0,0,0,0.3)',
                  }}>
                  <Chat
                    height={20}
                    width={20}
                    fill={isChatVisible ? 'black' : '#FFF'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPause(d => !d);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
              }}>
              {pause ? (
                <Play height={26} width={26} fill="#FFF" />
              ) : (
                <Pause height={26} width={26} fill="#FFF" />
              )}
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 12,
                }}>
                {toHHMMSS(progress)}
              </Text>
              <View
                style={{
                  flex: 1,
                }}>
                <Slider
                  maximumValue={playableDuration}
                  minimumValue={0}
                  onValueChange={value => {
                    seekTo(value);
                  }}
                  value={progress}
                  maximumTrackTintColor={Platform.select({
                    android: '#ffffff',
                    ios: '#ffffff',
                  })}
                  minimumTrackTintColor={'#FF5D5D'}
                  thumbTintColor={'#FF5D5D'}
                />
              </View>
              <Text style={{color: '#ffffff', fontSize: 12}}>
                {toHHMMSS(playableDuration)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                deviceOrientation === 'PORTRAIT'
                  ? Orientation.lockToLandscape()
                  : Orientation.lockToPortrait();
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              {deviceOrientation === 'PORTRAIT' ? (
                <FullScreen height={16} width={16} fill="#FFF" />
              ) : (
                <ExitFullScreen height={22} width={22} fill="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
}
