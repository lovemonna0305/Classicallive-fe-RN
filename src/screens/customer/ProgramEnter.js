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
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  likepost,
  uppost,
  downpost,
  followuser,
  cancelProgram,
  getPrograms,
  getProgramsByPerformer,
  completeProgram,
} from "../../actions/customer";
import { getChat } from "../../actions/common";

import { RTCView, mediaDevices } from '@videosdk.live/react-native-sdk';
import { Copy, MicOff, MicOn, VideoOff, VideoOn } from '../../assets/icons';
import TextInputContainer from '../../components/TextInputContainer';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import { useStore } from "../../store/store";
import { api } from "../../api";

export default function CustomerProgramEnter() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [meetingId, setMeetingId] = useState('');

  const token = store.streaming.token;
  const streaming = store.streaming;
  const currentUser = store.currentUser;
  const program = store.program;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCancelProgram, setModalCancelProgram] = useState(false);

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      (api.getMeetingID(program.id))
        .then(res => {
          setMeetingId(res.data.data.meetingId);
          changeStore({ ...store, isLoading: false });
        }).catch(res => {
          changeStore({ ...store, isLoading: false });
        })
    })();
  }, []);

  const handleReview = () => {
    navigation.navigate("CustomerReviewList");
  };

  const naviagateToViewer = () => {

    streaming.name = currentUser.name.trim()
    streaming.meetingId = meetingId;
    streaming.mode = 'VIEWER';

    changeStore({
      ...store,
      streaming: streaming
    });
    navigation.navigate('Meeting');
  };

  const handleCancel = () => {
    setModalCancelProgram(false);
    navigation.navigate("CustomerHistoryList");
  };
  const cancelprogram = () => {
    setModalCancelProgram(true);
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
            justifyContent: 'center',
          }}>
          <View style={{ marginHorizontal: 32, marginVertical: 40 }}>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#202427',
                borderRadius: 12,
                marginVertical: 12,
                // flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Token : {token}
              </Text>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Meeting Code : {meetingId}
              </Text>
            </View>

            <TouchableOpacity onPress={() => naviagateToViewer()}>
              <View
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 5,
                  padding: 10,
                  marginLeft: 10,
                }}>
                <Text style={[style.activetext, { textAlign: "center" }]}>
                  {t("join_meeting")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
