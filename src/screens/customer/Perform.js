import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  Styleheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  Modal,
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
import { server } from "../../constants";
export default function CustomerPerform() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { reservation } = useSelector((state) => state.customer);
  const { currentUser } = useSelector((state) => state.auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEnter, setModalEnter] = useState(false);

  useEffect(() => {
    console.log("purchase coins page->",);
  }, []);

  const watchprogram = () => {
    // check 
    var start_time = reservation.date +" "+ reservation.start_time;
    var end_time = reservation.date +" "+ reservation.end_time;
    var five_diff = Math.abs(new Date() - new Date(start_time.replace(/-/g,'/')));
    var end_diff = Math.abs(new Date() - new Date(end_time.replace(/-/g,'/')));

    if((reservation.status=="done")&&(reservation.status!="completed")&&(five_diff< 5 * 60 * 1000)&&(end_diff<0)) {
      // Enter page
    } else {
      setModalVisible(true)

    }
    

  }

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30,  }]}
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
        trailing={(props) => (
          <HStack
            style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ paddingRight: 10 }}>
              <Image
                source={require("../../../assets/img/ic_coin.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{ paddingRight: 20 }}>
              <Text style={{ color: theme.txt, fontSize: 15 }}>{reservation.points}</Text>
            </View>
          </HStack>
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
            < Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={style.centeredView}>
                <View style={style.modalView}>
                  <View style={style.modalwidth}>
                    <Text style={style.modalText}>{t("can_enter_5mins_ago")}</Text>
                    <TouchableOpacity
                      style={[style.button, style.buttonClose]}
                      onPress={() => buycoins()}>
                      <Text style={style.textStyle}>{t("cancel")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          <View style={{ paddingTop: 10 }}>
            <Image
              source={{ uri: server.media_url + reservation.image_file }}
              resizeMode="contain"
              style={[style.img, { height: 200 }]}
            />
          </View>
          <View style={{paddingVertical:5}}>
            <Text style={style.activetext}>{t("performer")}</Text>
          </View>
          <View style={{height:90,padding:5,backgroundColor:theme.box, borderRadius:5}}>
            <View style={[style.row,{justifyContent:"space-between",paddingTop:5, paddingHorizontal:10}]}>
              <View style={style.row}>
                <View style ={{}}>
                  <Image
                    source={{ uri: "http://192.168.145.168:8000/media/2.jpg" }}
                    style={{width:70,height:70,borderRadius:5}}
                  />
                </View>
                <View style={{paddingLeft:10}}>
                  <Text style={style.activetext}>{reservation.member.name}</Text>
                    <StarRatingDisplay
                    style={{paddingTop:10}}
                      rating={reservation.member.rating}
                      starSize={12}  
                      starStyle={{paddingHorizontal:1,marginHorizontal:0}}
                    />
                    {/* Not Complete post numbers */}
                  <Text style={[style.secondarytext,{fontSize:12,paddingTop:5}]}>投稿数 : 21    フォロワー : {reservation.member.followers}</Text>
                </View>
              </View>
              <TouchableOpacity style={{paddingRight:5,paddingTop:5}}
                onPress={()=> navigation.navigate("CustomerPostList")}
              >
                <Image
                  source={require("../../../assets/img/music_list.png")}
                  resizeMode="contain"
                  style={{ width: 22, height: 22 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingTop:25}}>
            <Text style={[style.activetext,{}]}>{reservation.title}</Text>
          </View>
          <View style={{paddingTop:10}}>
            <Text style={[style.secondarytext,{fontSize:10}]}>{reservation.date} {reservation.start_time}~{reservation.end_time}</Text>
          </View>
          {/* Detail */}
          <View style={[style.row,{paddingTop:10, justifyContent:"space-between"}]}>
            <View style={[style.row,{paddingRight:10}]}>
              <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="user"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{reservation.points}</Text>
                </View>
              </View>
              <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="heart"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{reservation.points}</Text>
                </View>
              </View>
              <View style={[style.row,{}]}>
                <View style={[style.row,{alignItems:'center'}]}>
                  <Icon
                  name="times"
                  size={15}
                  color={Colors.btn} />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{reservation.points}</Text>
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
                  <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{reservation.points}</Text>
                </View>
              </View>
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
                <Text style={{ color: theme.txt, fontSize: 15 }}>{reservation.points}</Text>
              </View>
            </View>
          </View>
          <View style={{paddingTop:10}}>
            <Text style={[style.secondarytext,{fontSize:14}]}>{reservation.description}</Text>
          </View>
          
          <View style={{paddingTop:10}}>
            <View style={[style.row,{justifyContent:"center",alignItems:"center"}]}>
              <View style={{flex:1,justifyContent:"center"}}>
                <TouchableOpacity
                  onPress={()=> watchprogram()}
                >
                  <View style={{backgroundColor:"#75C922",borderRadius:5, padding:10,marginRight:10}}>
                    <Text style={[style.activetext,{textAlign:"center"}]}>{t("watch")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:1}}>
                <TouchableOpacity>
                  <View style={{backgroundColor:"#D05A35",borderRadius:5, padding:10,marginLeft:10}}>
                    <Text style={[style.activetext,{textAlign:"center"}]}>{t("cancel")}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            </View>

        </View>         

      </ScrollView>
      <View style={[style.row,{height:50,paddingHorizontal:50, paddingBottom:10,justifyContent:"space-between"}]}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
               name="envelope"
               size={20}
               color={theme.txt}
            />
            <Text style={style.activetext}>{t("message")}</Text>
        </View>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={()=>reservation()}
        >
            <Icon
               name="arrow-right"
               size={20}
               color={theme.txt}
            />
            <Text style={style.activetext}>{t("review")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
