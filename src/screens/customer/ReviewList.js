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
  Dimensions,
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

import { getReviewsByPost } from "../../actions/common";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";

export default function CustomerReviewList() {
  const { t } = useTranslation();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { program } = useSelector((state) => state.customer);
  const { users, reviews } = useSelector((state) => state.common);

  useEffect(() => {

  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const selectReview = (item) => {
    // dispatch(setProgram(item));
    // navigation.navigate("CustomerReviewDetail")
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 40 }]}
    >
      <AppBar
        color={theme.bg}
        title={t("review")}
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
      <ScrollView style={{ flex: 1, marginHorizontal: 20 , marginBottom:5}}>
        
        {reviews&&(reviews.length>0)&&reviews.map((item, index)=>(
          <>
          <TouchableOpacity key={`customer-review-${item.id}`} 
            style={{height:90,padding:5,backgroundColor:theme.box, borderRadius:5,marginBottom:5}}
            onPress={() =>selectReview(item)}>
            <View style={[style.row,{paddingTop:5, paddingHorizontal:10}]}>
              <View style ={{flex:1}}>
                <Image
                  source={{ uri: server.media_url + users[item.customer_id]['image_file'] }}
                  style={{width:70,height:70,borderRadius:5}}
                />
              </View>
              <View style={{flex:4}}>
                <View style={[style.row,{alignContent:"center", justifyContent:"space-between",marginHorizontal:5, marginBottom:7}]}>
                  <View style={{paddingLeft:10}}>
                    <Text numberOfLines={1} style={[style.activetext,{width:width/2-50}]}>{users[item.customer_id]['name']}</Text>
                  </View>
                  <View style={{paddingTop:5}}>
                    <StarRatingDisplay
                        rating={item.rating}
                        starSize={12}
                        starStyle={{paddingHorizontal:1,marginHorizontal:0}}
                      />
                  </View>
                </View>
                <View style={[style.row,{alignContent:"center", justifyContent:"space-between",marginHorizontal:5, marginBottom:8}]}>
                  <View style={{paddingLeft:10}}>
                    <Text numberOfLines={2} style={[style.secondarytext,{fontSize:12,width:width/2+50}]}>{item.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
         </>
        ))}
      </ScrollView>
      <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={()=>navigation.navigate("CustomerReview")}
          >
            <Avatar.Image
              // source={require("../../../assets/image/plus.png")}
              style={{ backgroundColor: "" }}
              size={130}
            ></Avatar.Image>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
