import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import IntroItem from "./IntroItem";
import Slides from "./Slides";
import style from "./theme/style";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import { Colors } from "./theme/color";
import themeContext from "./theme/themeContex";
import { storage } from "./utils/storage";
import { useTranslation } from 'react-i18next';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Introduction() {
  const ref = React.useRef(null);
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const theme = useContext(themeContext);

  const { t, i18n  } = useTranslation();

  // const HandleSkip = async () => {
  //   await storage.setItem("skipIntro", true);
  //   store.dispatch({ type: SKIP_INTRO, payload: true });
  //   navigation.navigate("FinalOnBoarding");
  // };

  useEffect(() => {
    const fetch = async () => {
      try {
        const intro = storage.getItem("skipIntro");
        if (intro == "true") navigation.navigate("FinalOnBoarding");
      } catch (e) {}
    };
    fetch();
  }, []);

  const Footer = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            marginBottom: 0,
            paddingRight: 20,
          }}
        >
          {Slides.map((_, index) => (
            <View
              key={index}
              style={[
                style.indicator,
                currentSlideIndex === index && {
                  borderColor: Colors.primary,
                  borderWidth: 1,
                  paddingHorizontal: 20,
                  padding: 3,
                  borderRadius: 10,
                  backgroundColor: Colors.btn,
                  alignItems: "center",
                  marginHorizontal: 1,
                },
              ]}
            />
          ))}
        </View>
        {currentSlideIndex == 0 ? (          
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ paddingVertical: 20 ,flex:1}}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[style.btn, { backgroundColor: Colors.btn ,marginHorizontal:30}]}
              >
                <Text style={style.btntxt}>{t("screens.intro.button")}</Text>
                <Text style={style.btntxt}></Text>
              </TouchableOpacity>
            </View>
          </View>
        ): (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ paddingVertical: 20 ,flex:1}}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[style.btn, { backgroundColor: Colors.btn ,marginHorizontal:30}]}
              >
                <Text style={style.btntxt}>{t("screens.intro.button")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != Slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={Slides}
        ref={ref}
        renderItem={({ item }) => <IntroItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />
      <Footer />
    </SafeAreaView>
  );
}
