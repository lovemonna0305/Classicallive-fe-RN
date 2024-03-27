
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
        image: {
            borderRadius: 5,
        }
    })

    return (
        <Swiper style={[styles.wrapper, { marginTop: 20 }]} autoplay={false}>
            <View style={styles.slideContainer}>
                <TouchableOpacity style={styles.slide} onPress={() => { navigation.navigate("BookTrain") }}>
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.slideContainer}>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.slideContainer}>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.slide} >
                    <Image
                        // source={require('../../assets/image/gymcoach.png')}
                        style={[styles.image, sliderstyle.image]}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 170,
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
        width: 120,
        height: 120,
    },
});

export default ImageSwiper;



