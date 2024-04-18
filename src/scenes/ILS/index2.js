import React from 'react';
import {SafeAreaView} from 'react-native';
import colors from '../../styles/colors';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from './ILSContainer';
import {SCREEN_NAMES} from '../../navigators/screenNames';

export default function Meeting({navigation, route}) {
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled
    ? route.params.webcamEnabled
    : false;
  const webcamEnabled = route.params.webcamEnabled
    ? route.params.webcamEnabled
    : false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = route.params.mode ? route.params.mode : 'CONFERENCE';

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primary[900], padding: 12}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: micEnabled,
          webcamEnabled: webcamEnabled,
          name,
          mode, // "CONFERENCE" || "VIEWER"
          notification: {
            title: 'Video SDK Meeting',
            message: 'Meeting is running.',
          },
        }}
        token={token}>
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.navigate(SCREEN_NAMES.Home);
            },
          }}>
          {() => {
            return <ILSContainer webcamEnabled={webcamEnabled} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
