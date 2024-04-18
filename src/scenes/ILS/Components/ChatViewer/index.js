import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Linking,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TextInputContainer from './TextInput';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import Hyperlink from 'react-native-hyperlink';
import moment from 'moment';
import {usePubSub} from '@videosdk.live/react-native-sdk';
import colors from '../../../../styles/colors';
import {convertRFValue, useStandardHeight} from '../../../../styles/spacing';
import {RaiseHand} from '../../../../assets/icons';

const ChatViewer = ({raiseHandVisible}) => {
  const mpubsubRef = useRef();
  const vertical_40 = useStandardHeight(40);

  const mpubsub = usePubSub('CHAT', {});
  const {publish} = usePubSub('RAISE_HAND');

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;

  const [message, setMessage] = useState('');

  const flatListRef = React.useRef();
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    mpubsub.publish(message, {persist: true});
    setMessage('');
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };
  const scrollToBottom = () => {
    // flatListRef.current.scrollToEnd({animated: true});
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            marginLeft: 12,
            marginVertical: 12,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary[100],
              fontWeight: 'bold',
            }}>
            Chat
          </Text>
        </View>
        {mpubsub.messages ? (
          <FlatList
            ref={flatListRef}
            data={mpubsub.messages}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => {
              const {message, senderId, timestamp, senderName} = item;
              const localSender = localParticipantId === senderId;
              const time = moment(timestamp).format('hh:mm a');
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: colors.primary[600],
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    marginVertical: 6,
                    borderRadius: 4,
                    borderRadius: 10,
                    marginHorizontal: 12,
                    alignSelf: localSender ? 'flex-end' : 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: convertRFValue(12),
                      color: '#9A9FA5',
                      fontWeight: 'bold',
                    }}>
                    {localSender ? 'You' : senderName}
                  </Text>
                  <Hyperlink
                    linkDefault={true}
                    onPress={url => Linking.openURL(url)}
                    linkStyle={{color: 'blue'}}>
                    <Text
                      style={{
                        fontSize: convertRFValue(14),
                        color: 'white',
                      }}>
                      {message}
                    </Text>
                  </Hyperlink>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: convertRFValue(10),
                      alignSelf: 'flex-end',
                      marginTop: 4,
                    }}>
                    {time}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}_message_list`}
            style={{
              marginVertical: 5,
            }}
          />
        ) : null}
        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <TextInputContainer
              message={message}
              setMessage={setMessage}
              isSending={isSending}
              sendMessage={sendMessage}
            />
          </View>
          {raiseHandVisible ? (
            <TouchableOpacity
              onPress={() => {
                publish('MESSAGE');
              }}
              style={{
                height: vertical_40,
                backgroundColor: colors.primary[600],
                borderRadius: 10,
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 8,
              }}>
              <RaiseHand fill={'#fff'} height={30} width={30} />
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
};
export default ChatViewer;
