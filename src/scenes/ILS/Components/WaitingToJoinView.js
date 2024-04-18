import {convertRFValue} from '../../../styles/spacing';
import React from 'react';
import {Text, View} from 'react-native';
import colors from '../../../styles/colors';
import { t } from 'i18next';
export default function WaitingToJoinView() {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.primary[900],
      }}>
      <Text
        style={{
          fontSize: convertRFValue(18),
          color: colors.primary[100],
        }}>
          {t('please_wait')}
      </Text>
    </View>
  );
}
