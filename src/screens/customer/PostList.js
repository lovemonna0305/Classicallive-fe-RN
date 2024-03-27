import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Dimensions
} from "react-native";

import React, { useState, useContext, useEffect, useRef } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import { getProgramsByPerformer } from "../../actions/customer";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { setLoading, setProgram } from "../../actions/common";
export default function CustomerPostList() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { cPPrograms, program } = useSelector((state) => state.customer);
  const { isLoading } = useSelector((state) => state.common);

  useEffect(() => {
    (async () => {
      dispatch(getProgramsByPerformer(program.member.id))
    })();
    dispatch(setLoading(false));
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const selectProgram = (item) => {
    dispatch(setProgram(item));
    navigation.navigate("CustomerPostDetail");
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
      <AppBar
        color={theme.bg}
        title={t("live_list")}
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
        {isLoading && <Spinner />}
        <ScrollView style={{ flex: 1, marginHorizontal: 20 , marginBottom:5}}>
          {cPPrograms&&cPPrograms.map((item, index)=>(
            <>
            {(item.member.id===program.member.id)?( <TouchableOpacity key={`post-performer--${index}`}
              style={{height:90,padding:5,backgroundColor:theme.box, borderRadius:5,marginBottom:5}}
              onPress={() =>selectProgram(item)}>
              <View style={[style.row,{paddingTop:5, paddingHorizontal:10}]}>
                <View style ={{flex:1}}>
                  <Image
                    source={{ uri: server.media_url + item.image_file }}
                    style={{width:70,height:70,borderRadius:5}}
                  />
                </View>
                <View style={{flex:4}}>
                  <View style={[style.row,{alignContent:"center", justifyContent:"space-between",marginHorizontal:5, marginBottom:7}]}>
                    <View style={{paddingLeft:10}}>
                      <Text numberOfLines={1} style={[style.activetext,{width:width/2-50}]}>{item.title}</Text>
                    </View>
                    <View style={{paddingTop:5}}>
                      <StarRatingDisplay
                          rating={4.5}
                          starSize={12}
                          starStyle={{paddingHorizontal:1,marginHorizontal:0}}
                        />
                    </View>
                  </View>
                  <View style={[style.row,{alignContent:"center", justifyContent:"space-between",marginHorizontal:5, marginBottom:8}]}>
                    <View style={{paddingLeft:10}}>
                      <Text style={[style.secondarytext,{fontSize:12,}]}> {t(item.category.slug)}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={[style.secondarytext,{fontSize:10}]}>{item.date} {item.start_time}~{item.end_time}</Text>
                    </View>
                  </View>
                  <View style={[style.row,{alignContent:"center", justifyContent:"space-between",marginHorizontal:5,paddingLeft:10}]}>
                    <View style={[style.row,{alignContent:"center", justifyContent:"space-between",}]}>
                      <View style={[style.row,{}]}>
                        <View style={[style.row,{alignItems:'center'}]}>
                          <Icon
                          name={item.member.is_follow.includes("yes")?"user":"user-o"}
                          size={15}
                          color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{item.member.followers}</Text>
                        </View>
                      </View>
                      <View style={[style.row,{}]}>
                        <View style={[style.row,{alignItems:'center'}]}>
                          <Icon
                          name={item.is_liked.includes("yes")?"heart":"heart-o"}
                          size={15}
                          color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{item.likes}</Text>
                        </View>
                      </View>
                      <View style={[style.row,{}]}>
                        <View style={[style.row,{alignItems:'center'}]}>
                          <Icon
                          name={item.is_up.includes("yes")?"thumbs-up":"thumbs-o-up"}
                          size={15}
                          color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{item.ups}</Text>
                        </View>
                      </View>
                      <View style={[style.row,{}]}>
                        <View style={[style.row,{alignItems:'center'}]}>
                          <Icon
                          name={item.is_down.includes("yes")?"thumbs-down":"thumbs-o-down"}
                          size={15}
                          color={Colors.btn} />
                        </View>
                        <View style={{ paddingHorizontal: 5 }}>
                          <Text style={[style.activetext,{ color: Colors.btn, fontSize: 15 }]}>{item.downs}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[style.row,{alignItems:"center"}]}>
                      <View >
                        <Image
                          source={require("../../../assets/img/ic_coin.png")}
                          resizeMode="contain"
                          style={{ width: 20, height: 20 }}
                        />
                      </View>
                      <View style={{ paddingHorizontal:5}}>
                        <Text style={{ color: "white", fontSize: 11 }}>{item.points}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>):(null)}
          </>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
