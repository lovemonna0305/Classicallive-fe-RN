import Swiper from 'react-native-swiper';
import React, { useState, useContext } from "react";
import {
    View,
    Image,
} from "react-native";

export default ImageSlider = (props) => {
    return (

        <Swiper style={styles.wrapper} autoplay={true}>
            <View style={styles.slide}>
                <Image
                    source={require(props.imageURL)}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require(props.imageURL)}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    source={require(props.imageURL)}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </Swiper>
    );
}

