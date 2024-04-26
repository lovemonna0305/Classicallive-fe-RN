import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FastImage from 'react-native-fast-image';
import { BlurView } from '@react-native-community/blur';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

import { useSelector, useDispatch } from "react-redux";
import theme from "../theme/theme";

export default CardSlider = () => {

    const navigation = useNavigation();

    const { currentUser } = useSelector((state) => state.auth);
    const { flexers } = useSelector((state) => state.common);

    const styles = StyleSheet.create({
        wrapper: { height: 700 },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            height: 700,
            borderRadius: 30,
            borderWidth: 2,
            width: 350
        },
        overlay: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '30%',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: -100, // Adjust the value to position the text as desired
        },
        blurOverlay: {
            ...StyleSheet.absoluteFillObject,
        },
        hiddenMe: {
            display: "none"
        }
    });
    useEffect(() => {
        console.log('flex', flexers)
    }, [])

    const IntrdouctionComponent = (props) => {
        return (
            <>
                <LinearGradient
                    colors={['#6E635B', '#1D171B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        position: "absolute", bottom: 0, left: 10, backgroundColor: "black",
                        height: 250, paddingLeft: 10, width: '95%'
                    }}
                >
                    <Text style={{ color: theme.txt, fontSize: 30, fontWeight: 700, }}>{props.flexer.fullname}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Icon name="location-outline" size={40} style={{ color: theme.txt, fontSize: 20, marginTop: 5 }}></Icon>
                        <Text style={{ color: theme.txt, fontSize: 20, fontWeight: 700, }}>100 miles away</Text>
                    </View>
                    <View style={{
                        display: "flex", flexDirection: 'row',
                        marginTop: 5
                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Livechat", {
                                id: props.flexer._id,
                                fullname: props.flexer.fullname,
                            })
                        }}>
                            <Icon name="chatbubble-ellipses-outline" size={60} style={{ color: "#FFFF91", marginTop: 8 }}>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("FriendProfile", {
                                flexer: props.flexer,
                            })
                        }}>
                            <Icon name="person-outline" size={70} style={{ color: "#FF6085" }}>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="gift-outline" size={60} style={{ color: "#FFFF91", marginTop: 8 }}>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="heart-circle-outline" size={80} style={{ color: "#FF6085" }}>
                            </Icon>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="call-outline" size={60} style={{
                                color: "#FFFF91", marginTop: 8
                            }}>
                            </Icon>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

            </>
        )
    }

    return (
        <Swiper style={styles.wrapper} autoplay={false}>
            {flexers.map((flexer, index) => (
                <View key={index} style={styles.slide}>
                    <Image
                        // source={require('../../assets/image/f1.jpg')}
                        style={[styles.image, { position: "relative" }]}
                        resizeMode="cover"
                    />
                    <IntrdouctionComponent flexer={flexer} />
                </View>
            ))}
        </Swiper>
    );
};
