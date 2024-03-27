import {
    View,
    Image,
    StyleSheet,
} from "react-native";

import Swiper from 'react-native-swiper';
export default  ImageSlider = () => {

    const styles = StyleSheet.create({
        wrapper: { height: 300 },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: 400,
            height: 220,
        },
    });
    return (
        <Swiper style={styles.wrapper} autoplay={false}>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/accountsettingslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/accountsettingslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/accountsettingslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </Swiper>
    );
};
