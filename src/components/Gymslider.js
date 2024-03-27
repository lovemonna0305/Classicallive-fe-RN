import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Swiper from 'react-native-swiper';
export default Gymslider = () => {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        wrapper: { height: 460 },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            borderRadius: 15
        },
    });
    return (
        <Swiper style={styles.wrapper} autoplay={false}>
            <View style={styles.slide}>
                <TouchableOpacity onPress={() => { navigation.navigate("Gymintroduction")  }}>
                    <Image
                        // source={require('../../assets/image/gymslider.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.slide}>
                <Image
                    // source={require('../../assets/image/gymslider.png')}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
        </Swiper>
    );
};
