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
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/FontAwesome5";

import { RTCView, mediaDevices } from '@videosdk.live/react-native-sdk';
import { Copy, MicOff, MicOn, VideoOff, VideoOn } from '../../assets/icons';
import TextInputContainer from '../../components/TextInputContainer';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { createMeeting } from '../../api/api';


const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import { useStore } from "../../store/store";

import {
  completeProgram,
} from "../../actions/performer";
import { api } from "../../api";

export default function PerformerProgramEnter() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const [tracks, setTrack] = useState('');
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [meetingId, setMeetingId] = useState('');

  const streaming = store.streaming;
  const token = streaming.token;
  const currentUser = store.currentUser;
  const program = store.program;

  useEffect(() => {
    async function fetchData() {
      const _meetingId = await createMeeting({token});
      setMeetingId(_meetingId);

      let formdata = new FormData();
      formdata.append("post_id", program.id);
      formdata.append("meetingId", _meetingId);
      console.log(formdata);

      changeStore({ ...store, isLoading: true });

      await api.createMeetingID(formdata)
        .then(res => {
          changeStore({ ...store, isLoading: false, });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    }
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then(stream => {
          setTrack(stream);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );

  const disposeVideoTrack = () => {
    setTrack(stream => {
      stream.getTracks().forEach(track => {
        track.enabled = false;
        return track;
      });
    });
  };

  const naviagateToSpeaker = () => {
    disposeVideoTrack();
    streaming.name = currentUser.name.trim()
    streaming.meetingId = meetingId;
    streaming.micEnabled = micOn;
    streaming.webcamEnabled = videoOn;
    streaming.mode = 'CONFERENCE';
    changeStore({
      ...store,
      streaming:streaming
    });
    navigation.navigate('Meeting');
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: colors.primary['900'],
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary['900'],
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              paddingTop: '15%',
              height: '80%',
            }}>
            <View
              style={{
                flex: 1,
                width: '60%',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}>
                {videoOn && tracks ? (
                  <RTCView
                    streamURL={tracks.toURL()}
                    objectFit={'cover'}
                    mirror={true}
                    style={{
                      flex: 1,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#202427',
                    }}>
                    <Text style={{ color: colors.primary[100] }}>Camera Off</Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyContent: 'space-evenly',
                  position: 'absolute',
                  bottom: 10,
                  right: 0,
                  left: 0,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setMicon(!micOn);
                  }}
                  style={{
                    height: 50,
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: micOn ? colors.primary['100'] : 'red',
                  }}>
                  {micOn ? (
                    <MicOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <MicOff
                      width={25}
                      height={25}
                      fill={colors.primary['100']}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVideoOn(!videoOn);
                  }}
                  style={{
                    height: 50,
                    aspectRatio: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: videoOn ? colors.primary['100'] : 'red',
                  }}>
                  {videoOn ? (
                    <VideoOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <VideoOff
                      width={35}
                      height={35}
                      fill={colors.primary['100']}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 32, marginVertical: 40 }}>
            <TouchableOpacity onPress={() => naviagateToSpeaker()}>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 5,
                  padding: 10,
                  marginLeft: 10,
                }}>
                <Text style={[style.activetext, { textAlign: "center" }]}>
                  {t("create_meeting")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
