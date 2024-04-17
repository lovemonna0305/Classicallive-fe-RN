import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Button from '../../components/Button';
import {SCREEN_NAMES} from '../../navigators/screenNames';
import colors from '../../styles/colors';

export default function Home({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary['900'],
      }}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
          justifyContent: 'center',
        }}>
        <Button
          text={'Create a meeting'}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Speaker_Home, {
              isCreator: true,
            });
          }}
        />
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginVertical: 16,
          }}>
          <Text
            style={{
              color: '#202427',
              fontWeight: 'bold',
            }}>
            ──────────
          </Text>
          <Text
            style={{
              color: '#ffff',
              fontWeight: 'bold',
              marginHorizontal: 6,
            }}>
            OR
          </Text>
          <Text
            style={{
              color: '#202427',
              fontWeight: 'bold',
            }}>
            ──────────
          </Text>
        </View>
        <Button
          text={'Join as a speaker'}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Speaker_Home, {
              isCreator: false,
            });
          }}
        />
        <Button
          text={'Join as a viewer'}
          onPress={() => {
            navigation.navigate(SCREEN_NAMES.Viewer_Home, {});
          }}
        />
      </View>
    </SafeAreaView>
  );
}
