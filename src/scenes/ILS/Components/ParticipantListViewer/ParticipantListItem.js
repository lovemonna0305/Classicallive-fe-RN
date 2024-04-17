import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {convertRFValue} from '../../../../styles/spacing';
import {
  MicOff,
  MicOn,
  VideoOff,
  VideoOn,
  Person,
  More,
  PersonAdd,
  PersonRemove,
} from '../../../../assets/icons';
import colors from '../../../../styles/colors';
import {useParticipant, usePubSub} from '@videosdk.live/react-native-sdk';

function ParticipantListItem({participantId}) {
  const {displayName, webcamOn, micOn, isLocal, mode} =
    useParticipant(participantId);

  const IconContainer = ({Icon, style}) => {
    return (
      <View
        style={{
          height: 36,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 8,
          borderColor: 'rgba(245,245,245, 0.2)',
          borderRadius: 20,
          ...style,
        }}>
        <Icon />
      </View>
    );
  };

  const {publish} = usePubSub(`CHANGE_MODE_${participantId}`, {});

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: colors.primary[600],
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 36,
            aspectRatio: 1,
            borderRadius: 20,
            backgroundColor: colors.primary[500],
          }}>
          <Person />
        </View>
        <View
          style={{
            marginLeft: 8,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: convertRFValue(14),
              color: colors.primary[100],
            }}>
            {isLocal ? 'You' : displayName || ''}
          </Text>
          {mode === 'CONFERENCE' ? (
            <Text
              style={{
                backgroundColor: '#5568FE',
                marginLeft: 8,
                color: '#ffffff',
                padding: 4,
                fontWeight: 'bold',
                borderRadius: 4,
                fontSize: 10,
              }}>
              Host
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <IconContainer
          style={{
            borderWidth: micOn ? 1 : 0,
            backgroundColor: micOn ? 'transparent' : '#FF5D5D',
          }}
          Icon={() => {
            return micOn ? (
              <MicOn width={18} height={18} />
            ) : (
              <MicOff width={20} height={20} fill={colors.primary[100]} />
            );
          }}
        />

        <IconContainer
          style={{
            borderWidth: webcamOn ? 1 : 0,
            backgroundColor: webcamOn ? 'transparent' : '#FF5D5D',
          }}
          Icon={() => {
            return webcamOn ? (
              <VideoOn height={16} width={16} fill={colors.primary[100]} />
            ) : (
              <VideoOff width={24} height={24} fill={colors.primary[100]} />
            );
          }}
        />

        {!isLocal && mode == 'CONFERENCE' ? (
          <TouchableOpacity
            onPress={() => {
              publish({
                mode: 'VIEWER',
              });
            }}
            style={{
              height: 36,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'rgba(245,245,245, 0.2)',
              borderRadius: 20,
              marginLeft: 4,
            }}>
            <PersonRemove fill={colors.primary[100]} />
          </TouchableOpacity>
        ) : !isLocal && mode == 'VIEWER' ? (
          <TouchableOpacity
            onPress={() => {
              publish({
                mode: 'CONFERENCE',
              });
            }}
            style={{
              height: 36,
              aspectRatio: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'rgba(245,245,245, 0.2)',
              borderRadius: 20,
              marginLeft: 4,
            }}>
            <PersonAdd fill={colors.primary[100]} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
export default React.memo(ParticipantListItem);
