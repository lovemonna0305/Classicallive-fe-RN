import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import TextInputContainer from '../../../components/TextInputContainer';
import Button from '../../../components/Button';
import colors from '../../../styles/colors';
import {SCREEN_NAMES} from '../../../navigators/screenNames';
import {getToken} from '../../../api/api';

export default function Viewer_Home({navigation}) {
  const [name, setName] = useState('');
  const [meetingId, setMeetingId] = useState('lv95-q3kl-p544');
  const [token, setToken] = useState('');

  React.useEffect(() => {
    async function fetchData() {
      navigation.setOptions({
        title: 'Join as a viewer',
      });
      const token = await getToken();
      setToken(token);
    }
    fetchData();
  }, [navigation]);

  const naviagateToViewer = () => {
    navigation.navigate(SCREEN_NAMES.Meeting, {
      name,
      token,
      meetingId,
      mode: 'VIEWER',
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: colors.primary['900'],
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary['900'],
            justifyContent: 'center',
          }}>
          <View style={{marginHorizontal: 32}}>
            <TextInputContainer
              placeholder={'Enter meeting code'}
              value={meetingId}
              setValue={setMeetingId}
            />
            <TextInputContainer
              placeholder={'Enter your name'}
              value={name}
              setValue={setName}
            />
            <Button
              text={'Join as a viewer'}
              onPress={() => naviagateToViewer()}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
