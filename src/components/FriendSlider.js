import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Swiper from 'react-native-swiper';
export default Firendslider = () => {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        wrapper: { height: 460 },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 230,
            height: 380,
            borderColor: "#4A6C00",
            borderWidth: 2,
            borderRadius: 15
        },
    });
    return (
        <Swiper style={styles.wrapper} autoplay={false}>
            <View style={styles.slide}>
                <TouchableOpacity onPress={() => {  navigation.navigate("FriendProfile")  }}>
                    <Image
                        // source={require('../../assets/image/f3.jpg')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f1.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f2.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f4.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f5.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f6.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/f7.jpg')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </Swiper>
    );
};
