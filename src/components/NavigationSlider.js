
import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from '@react-navigation/native';

const ImageSwiper = () => {
  const handleImagePress = (index) => {
    console.log(`Image ${index + 1} pressed!`);
  };
  const navigation = useNavigation();

  const sliderstyle = StyleSheet.create({
    image : {
      borderRadius:5,
      borderColor:"green",
      borderWidth:2
    }
  })

  return (
      <Swiper style={[styles.wrapper,{marginTop:20}]} autoplay={false}>
        <View style={styles.slideContainer}>
          <TouchableOpacity style={styles.slide} onPress={() => { navigation.navigate("Analytics") }}>
            <Image
              // source={require('../../assets/image/analytics.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("FindGymflexers") }>
            <Image
              // source={require('../../assets/image/findgymflexers.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("") }>
            <Image
              // source={require('../../assets/image/entergym.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.slideContainer}>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("SearchGym") }>
            <Image
              // source={require('../../assets/image/searchgym.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("Setting") }>
            <Image
              // source={require('../../assets/image/accountsetting.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("Yourwallet") }>
            <Image
              // source={require('../../assets/image/wallet.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.slideContainer}>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("Paymentmethod") }>
            <Image
              // source={require('../../assets/image/paymentmethod.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => navigation.navigate("Livechat") }>
            <Image
              // source={require('../../assets/image/livechat.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide} onPress={() => handleImagePress(2)}>
            <Image
              // source={require('../../assets/image/buycoin.png')}
              style={[styles.image,sliderstyle.image]}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 150,
  },
  slideContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImageSwiper;



