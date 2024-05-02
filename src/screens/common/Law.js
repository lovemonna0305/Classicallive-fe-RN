import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,

} from "react-native";
import React, { useState, useContext } from "react";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { Colors } from "../../theme/color";
import themeContext from "../../theme/themeContex";
import style from "../../theme/style";
import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { t } from "i18next";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function Law() {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);



  const lawString = `
  <div style="font-size: 30px; color: ${theme.txt}">
  <div style="margintop:20px;">
    <h3>サービスの名称</h3>
    <p>Classical LIVE</p>
  </div>
  <div>
    <h3>事業者の名称</h3>
    <p>Classical LIVE 事務局</p>
  </div>
  <div>
    <h3>事業者住所</h3>
    <p>〒104-0061 東京都中央区銀座 1-12-4 N&amp;E BLD.7 階</p>
  </div>
  <div>
    <h3>事業者電話番号</h3>
    <p>以下のお問合せ先又は本アプリの問い合わせフォームからご照会 をいただいた場合には、遅滞なく開示いたします。</p>
  </div>
  <div>
    <h3>お問合せ先</h3>
    <p>support@classicallive.jp</p>
  </div>
  <div>
    <h3>利用規約</h3>
    <p>「Classical LIVE 利用規約（視聴ユーザー用）」</p>
  </div>
  <div>
    <h3>販売代金</h3>
    <p>・演奏ユーザーのライブ企画内に記載しております。</p>
  </div>
  <div>
    <h3>お支払い時期 お支払い方法</h3>
    <p>
      1） 視聴ユーザーは、指定決済事業者を通じた方法で、コイン購入代金を支払うことによって、運営者から当該代金相当額のコインの付与を受けるものとし、当該付与コインをライブ視聴権購入代金に充当するために費消することができるものとします。<br>
      2） 視聴ユーザーは、演奏ユーザーのライブ企画の内容を十分確認したうえで、ライブ視聴権を選択し、あらかじめ付与を受けたコインからライブ視聴権購入代金に充当を行うことで、当該ライブ視聴権の購入を行うものとします。ライブ視聴権購入契約は、本アプリにおける購入手続きが完了した時点で、演奏ユーザーと視聴ユーザーとの間で成立するものとします。
    </p>
  </div>
  <div>
    <h3>利用料金以外に必要な料金</h3>
    <p>・インターネット接続料等につきましては、契約した通信販売事業者にお支払いください。</p>
  </div>
  <div>
    <h3>サービス利用開始時期</h3>
    <p>・演奏ユーザーがライブ企画内で表示したライブ演奏日時にライブ演奏を視聴することができます。</p>
  </div>
  <div>
    <h3>動作環境</h3>
    <p>・iOS13.0 以上が動作する iPhone 端末</p>
  </div>
  <div>
    <h3>キャンセル</h3>
    <p>
      1） 視聴ユーザーは、原則として、ライブ視聴権購入契約をキャンセルすることはできないものとします。ただし、以下のいずれかに該当した場合、例外的にキャンセルをすることができるものとします。<br>
      ① 視聴ユーザーと演奏ユーザーとの間で、キャンセルに関する合意を行い、かつライブ予定日の前日までに演奏ユーザーが本アプリ上にキャンセル登録を行った場合<br>
      ② ライブ企画で定めた開始時刻から 15 分を経過しても演奏ユーザーがライブの演奏を開始しない場合<br>
      2） キャンセルが成立した場合、ライブ視聴権購入代金に相当するコインは、視聴ユーザーに返還されるものとします。
    </p>
  </div>
  <div>
    <h3>取引にあたっての注意事項</h3>
    <p>「Classical LIVE 利用規約（視聴ユーザー用）」をご確認ください。</p>
  </div>
</div>`;

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg,paddingTop: 30, }]}
    >
      <View style={[style.main, { backgroundColor: theme.bg }]}>
        <AppBar
          color={theme.bg}
          title={t('law')}
          titleStyle={{ color: theme.txt }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color={theme.txt}
                size={40}
              />
            </TouchableOpacity>
          }
        />
        <View style={{ marginVertical: 20, flex: 1 }}>
          <WebView originWhitelist={['*']} source={{ html: lawString }} style={{ flex: 1, backgroundColor: theme.bg, fontweight: 'bold', fontsize: 20 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
