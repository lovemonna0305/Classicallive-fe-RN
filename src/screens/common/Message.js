import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AppBar, Spacer } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import themeContext from "../../theme/themeContex";
import { SafeAreaView } from "react-native-safe-area-context";

import { t } from "i18next";
import { getChats, setLoading } from "../../actions/common";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";
import Footer from "../../components/Footer";

export default function Message() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const theme = useContext(themeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [chats, setChats] = useState(global.chats);

  useEffect(() => {
    changeStore({ ...store, isLoading: true });
    (async () => {
      await getChats()
        .then(res => {
          setChats(res);
          changeStore({ ...store, isLoading: false });
        }).catch(err => {
          changeStore({ ...store, isLoading: false });
        });
    })();
  }, []);

  return (
    <SafeAreaView style={[style.area, { backgroundColor: theme.bg }]}>
      <AppBar
        color={theme.bg}
        title={t("message")}
        titleStyle={{ color: theme.txt }}
        centerTitle={true}
        elevation={0}
      // leading={
      //   <TouchableOpacity onPress={() => navigation.goBack()}>
      //     <Avatar.Icon
      //       icon="arrow-left"
      //       style={{ backgroundColor: theme.bg }}
      //       color=theme.txt
      //       size={40}
      //     />
      //   </TouchableOpacity>
      // }
      />
      <View style={{ flex: 1 }}>
        {store.isLoading && (
          <Spinner />
        )}
        {chats && chats.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginHorizontal: 10 }}
          >
            {chats.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  paddingTop: 20,
                  width:width*0.9
                }}
                onPress={() => {
                  changeStore({ ...store, isLoading: true });
                  navigation.navigate("LiveChat", {
                    id: item.chat.id,
                    member: item.member,
                  });
                }}
              >
                <Avatar.Image source={{ uri: server.member_url + item.member.image_file }} />
                <View style={{ paddingLeft: 10 }}>
                  <Text
                    style={[style.subtitle, { width: width*0.4, color: theme.txt, fontSize: 16 }]}
                  >
                    {item.member.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      style.subtxt,
                      {
                        width: width * 0.4,
                        color: Colors.disable,
                        paddingTop: 8,
                        paddingRight: 5,
                      },
                    ]}
                  >
                    {(item.chat.last_message) ?? t("no_mes")}
                  </Text>

                </View>

                <View style={{ marginLeft: 10, width: width / 4, justifyContent: 'flex-end' }}>

                  {(item.chat.unreadMsg != 0) ? (
                    <View
                      style={{
                        backgroundColor: "#FE970F",
                        height: 20,
                        width: 20,
                        borderRadius: 20,
                        alignSelf: "flex-end",
                        marginTop: 8,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            textAlign: "center",
                            color: Colors.secondary,
                            fontSize: 12,
                          }}
                        >
                          {item.chat.unreadMsg}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    null
                  )}
                  <Text style={[style.subtxt, { color: Colors.disable, textAlign: 'right' }]}>
                    {item.chat.updated_at}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 14,
                textAlign: "center",
                opacity: 0.4,
              }}
            >
              {t("no_mes")}
            </Text>
          </View>
        )}
      </View>
      <Footer />
    </SafeAreaView>
  );
}
