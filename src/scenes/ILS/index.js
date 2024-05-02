import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Clipboard,
} from "react-native";


import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";

import colors from '../../styles/colors';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from './ILSContainer';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import {SCREEN_NAMES} from '../../navigators/screenNames';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server, videosdk } from "../../constants";
import { useStore } from "../../store/store";
import { completeProgram } from "../../actions/performer";

export default function Meeting() {
  const { store, changeStore } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const token = videosdk.token;
  const currentUser = store.currentUser;
  const program = store.program;
  const iscomplete = store.iscomplete;
  const pPendingPoints = store.pPendingPoints;
  
  const meetingId = store.streaming.meetingId;
  const micEnabled = store.streaming.micEnabled
    ? store.streaming.webcamEnabled
    : false;
  const webcamEnabled = store.streaming.webcamEnabled
    ? store.streaming.webcamEnabled
    : false;
  const name = store.streaming.name ? store.streaming.name : 'Test User';
  const mode = store.streaming.mode ? store.streaming.mode : 'CONFERENCE';

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
            title: t('video_streaming'),
            message: t('playing_is_running'),
          },
        }}
        token={token}>
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              if((currentUser.role_id==3)&&iscomplete){
                changeStore({ ...store, isLoading: true });
                (async () => {
                  completeProgram(program.id)
                    .then(points => {
                      currentUser.points = Number(currentUser.points) + Number(points);
                      changeStore({ ...store, isLoading: false, currentUser: currentUser, pPendingPoints: points });
                    }).catch(err => {
                      changeStore({ ...store, isLoading: false });
                    });
                })();
              }
              navigation.navigate('HistoryList');
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
