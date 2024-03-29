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
  Dimensions,
} from "react-native";

import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
import { AppBar, HStack } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
import { getReviewsByPost } from "../../actions/common";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";

export default function PerformerHistoryDetail() {
  const { changeStore, store } = useStore();
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const program = store.program;
  const [reviews, setReviews] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEnter, setModalEnter] = useState(false);

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getReviewsByPost(program.id)
        .then(res => {
          setReviews(res)
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        })
    })();
  }, []);

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
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
              color="white"
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{flex:1}}>
        {store.isLoading && <Spinner />}
        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:10}}>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <View style={{ paddingTop: 10 }}>
              <Image
                source={{ uri: server.media_url + program.image_file }}
                resizeMode="contain"
                style={[style.img, { height: 200 }]}
              />
            </View>
            <View style={{paddingTop:25}}>
              <Text style={[style.activetext,{}]}>{program.title}</Text>
            </View>
            <View style={{paddingTop:10}}>
              <Text style={[style.secondarytext,{fontSize:10}]}>{program.date} {program.start_time}~{program.end_time}</Text>
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
                    <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{program.users}</Text>
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
                    <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{program.likes}</Text>
                  </View>
                </View>
                <View style={[style.row,{}]}>
                  <View style={[style.row,{alignItems:'center'}]}>
                    <Icon
                    name="thumbs-up"
                    size={15}
                    color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{program.ups}</Text>
                  </View>
                </View>
                <View style={[style.row,{}]}>
                  <View style={[style.row,{alignItems:'center'}]}>
                    <Icon
                    name="thumbs-down"
                    size={15}
                    color={Colors.btn} />
                  </View>
                  <View style={{ paddingHorizontal: 5 }}>
                    <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{program.downs}</Text>
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
                  <Text style={{ color: "white", fontSize: 15 }}>{program.points}</Text>
                </View>
              </View>
            </View>
            <View style={{paddingTop:10}}>
              <Text style={[style.secondarytext,{fontSize:14}]}>{program.description}</Text>
            </View>

            <View style={{paddingVertical:5}}>
              <Text style={style.activetext}>{t("review")}</Text>
            </View>
            {(reviews)&&(reviews.length > 0)&&(reviews.map((item,index)=>(
              <View key={`rating${index}`} style={{height:90,padding:5,backgroundColor:theme.box, borderRadius:5, marginVertical:5}}>
                <View style={[style.row,{justifyContent:"space-between",paddingTop:5, paddingHorizontal:10}]}>
                  <View style={style.row}>
                    <View style ={{}}>
                      <Image
                        source={{ uri: server.media_url + item.customer.image_file }}
                        style={{width:70,height:70,borderRadius:5}}
                      />
                    </View>
                    <View style={{paddingLeft:10}}>
                      <Text style={style.activetext}>{item.customer.name}</Text>
                      <StarRatingDisplay
                      // style={{paddingTop:10}}
                        rating={item.rating}
                        starSize={12}  
                        starStyle={{paddingHorizontal:1,marginHorizontal:0}}
                      />
                      <Text numberOfLines={2} style={[style.secondarytext,{fontSize:12,paddingTop:5, width:width-150,}]}>{item.description}</Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity style={{paddingRight:5,paddingTop:5}}
                    onPress={()=> navigation.navigate("CustomerPostList")}
                  >
                    <Image
                      source={require("../../../assets/img/music_list.png")}
                      resizeMode="contain"
                      style={{ width: 22, height: 22 }}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            )))}
          </View>         
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
