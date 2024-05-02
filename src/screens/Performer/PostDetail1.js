import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import { useDispatch, useSelector } from "react-redux";
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome5";

import {
  deleteProgram
} from "../../actions/performer";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";

export default function PerformerPostDetail1() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { pProgram } = useSelector((state) => state.performer);
  const { currentUser } = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);

  const editprogram = () => {
    navigation.navigate("PerformerPostEdit");
  };

  useEffect(() => {
    (async () =>{

    })();
    console.log("Post Details page->",);
    
  }, []);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30,   }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("detail")}
        titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt}
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <View style={{ paddingTop: 10 }}>
            <Image
              source={{ uri: server.media_url + pProgram.image_file }}
              resizeMode="contain"
              style={[style.img, { height: 200 }]}
            />
          </View>
          <View style={{paddingTop:25}}>
            <Text style={[style.activetext,{}]}>{pProgram.title}</Text>
          </View>
          <View style={{paddingTop:10}}>
            <Text style={[style.secondarytext,{fontSize:10}]}>{pProgram.date} {pProgram.start_time}~{pProgram.end_time}</Text>
          </View>
          {/* Detail */}
          <View style={[style.row,{paddingTop:10, justifyContent:"space-between"}]}>
            <View style={[style.row,{paddingRight:10}]}>
              <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="heart"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{pProgram.likes}</Text>
                </View>
              </View>
              {/* <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="times"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{pProgram.points}</Text>
                </View>
              </View>
              <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="star"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{pProgram.points}</Text>
                </View>
              </View> */}
            </View>
            <View style={[style.row,{paddingRight:5}]}>
              <View >
                <Image
                  source={require("../../../assets/img/ic_coin.png")}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <View style={{ paddingRight: 10 ,paddingHorizontal:5}}>
                <Text style={{ color: theme.txt, fontSize: 15 }}>{pProgram.points}</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop:10}}>
            <Text style={[style.secondarytext,{fontSize:14}]}>{pProgram.description}</Text>
          </View>

        </View>         

      </ScrollView>
      <View style={[style.row,{height:50,paddingHorizontal:50, paddingBottom:10,justifyContent:"flex-end", alignItems:"center"}]}>
        <View style={{alignItems: 'center', justifyContent: 'center',marginRight:10}}>
          <TouchableOpacity
              onPress={()=> editprogram()}
            >
              <View style={{backgroundColor:Colors.green, borderRadius:5, padding:5,paddingHorizontal:10,width:80}}>
                <Text style={[style.activetext,{textAlign:"center"}]}>{t("edit")}</Text>
              </View>
            </TouchableOpacity>
        </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(true)
            }}>
            <View style={{backgroundColor:Colors.cancel,borderRadius:5, padding:5,paddingHorizontal:10,marginLeft:5,width:80}}>
              <Text style={[style.activetext,{textAlign:"center"}]}>{t("delete")}</Text>
            </View>
          </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            width: width,
            backgroundColor: "#000000aa",
          }}
        >
          <View
            style={[
              style.modalcontainer,
              {
                backgroundColor: theme.bg,
                width: width - 30,
                marginVertical: 170,
              },
            ]}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ paddingTop: 10, alignSelf: "center" }}>
                <Avatar.Icon
                  icon="help"
                  color="#FF4747"
                  size={80}
                  style={{
                    borderWidth: 5,
                    borderColor: "#FF4747",
                    backgroundColor: theme.bg,
                  }}
                />
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={[
                    style.subtitle,
                    { color: theme.txt, textAlign: "center" },
                  ]}
                >
                  {t("sure_delete")}
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <Text
                  style={[
                    style.subtxt,
                    { color: Colors.disable, textAlign: "center" },
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log(pProgram.id);
                    let formdata = new FormData();
                    formdata.append("post_id", pProgram.id);
                    dispatch(deleteProgram(formdata));
                    setVisible(false);
                  }}
                  style={{
                    paddingHorizontal: 30,
                    paddingVertical: 12,
                    borderColor: "#FF4747",
                    borderWidth: 1,
                    borderRadius: 20,
                    backgroundColor: theme.bg,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#FF4747",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("ok")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 35,
                    paddingVertical: 12,
                    backgroundColor: Colors.primary,
                    borderRadius: 20,
                    marginLeft: 10,
                  }}
                  onPress={() => setVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.bg,
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {t("cancel")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
