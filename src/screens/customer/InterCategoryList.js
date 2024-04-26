import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useContext, useEffect } from "react";
import theme from "../../theme/theme";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import { useTranslation } from "react-i18next";

import { useNavigation } from "@react-navigation/native";
import { getCategoryArray, getSubCategory, setCategory, setLoading } from "../../actions/common";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import Icons from "react-native-vector-icons/FontAwesome";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../../constants";
import Spinner from "../../components/Spinner";
import { useStore } from "../../store/store";
import { updateInterCategory } from "../../actions/customer";


export default function CustomerInterCategoryList() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const currentUser = store.currentUser;

  const [darkMode, setDarkMode] = useState(false);
  const [categoryArray, setCategoryArray] = useState({});

  const [select, setSelect] = useState([]);

  const selectItem = (id) => {
    if(select.includes(id)) {
      const tmp = [...select];
      const idx = tmp.indexOf(id)
      tmp.splice(idx, 1)
      setSelect(tmp)
    } else {
      setSelect([
        ...select,
        id
      ])
    }
  };
 
  const handleupdateInterCategory = async ()=>{
    let formdata = new FormData();
    formdata.append("inter_category", select.toString());
    let update_user = currentUser;
    update_user.interesting_category = select.toString();
    changeStore({...store, isLoading:true});
    (async () => {
      await updateInterCategory(formdata)
      .then(res=>{
        changeStore({ ...store, currentUser: update_user });
        changeStore({...store, isLoading:false});
      }).catch(err=>{
        changeStore({...store, isLoading:false});
      });
    })();
  }

  useEffect(() => {
    changeStore({...store, isLoading:true});
    (async () => {
      await getCategoryArray()
      .then(res=>{
        setCategoryArray(res);
        let categories = currentUser.interesting_category?currentUser.interesting_category.split(',').map(Number):[];
        setSelect(categories);
        changeStore({...store, isLoading:false});
      }).catch(err=>{
        changeStore({...store, isLoading:false});
      });
    })();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      {/* <StatusBar backgroundColor="transparent" translucent={true} /> */}
      <AppBar
        color={theme.bg}
        title={t("interest_category")}
        // titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans", fontSize: 30, fontWeight: 700, fontStyle: 'italic', }}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Avatar.Icon
              icon="arrow-left"
              style={{ backgroundColor: theme.bg }}
              color={theme.txt} 
              size={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{flex:1}}>
        {store.isLoading && <Spinner />}
        <ScrollView style={{flex:1}}>
          <View style={{flex:1, flexDirection:'row',alignItems:"center", justifyContent:"space-between", marginTop: 10, }}>
            <Text
              style={{
                marginVertical: 8,
                fontWeight: 800,
                color: theme.txt,
                fontSize: 20,
                marginHorizontal: 20,
              }}
            >
              {t("all_category")}
            </Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: 35,
                paddingVertical: 12,
                backgroundColor: Colors.btn,
                borderRadius: 20,
                marginRight: 10,
              }}
              onPress={()=>handleupdateInterCategory()}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: theme.bg,
                  fontFamily: "Plus Jakarta Sans",
                }}
              >
                {t("update")}
              </Text>
            </TouchableOpacity>
          </View>
          
          {(categoryArray['category'])&&(categoryArray['category'].map((item, index)=>(
            <View key={`category-${index}`} style={{margin:10}}>
              <Text style={{
                fontWeight: 800,
                color: theme.txt,
                fontSize: 20,
                marginHorizontal: 10,}}>{t(item.label)}</Text>
                <View
                  style={{
                    paddingTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {categoryArray['subcategory'][index] &&
                    categoryArray['subcategory'][index].map((item, index) => (
                      <View key={`subcategory-${index}`} style={{ margin: 3 }}>
                        <TouchableOpacity
                          style={
                            (select.includes(item.value))?
                            {
                              paddingHorizontal: 15,
                              paddingVertical: 10,
                              borderRadius: 20,
                              borderColor: theme.icon,
                              backgroundColor: theme.bg,
                              borderWidth: 1,
                            }:{
                              paddingHorizontal: 15,
                              paddingVertical: 10,
                              borderRadius: 20,
                              borderColor: "#E3E7EC",
                              backgroundColor: theme.bg,
                              borderWidth: 1,
                            
                            }}
                          onPress={()=>selectItem(item.value)}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              color: theme.txt,
                              fontFamily: "Plus Jakarta Sans",
                            }}
                          >
                            {t(item.label)}
                          </Text>
                        </TouchableOpacity>
                        {/* selected */}
                        {/* <TouchableOpacity
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 20,
                        borderColor: theme.icon,
                        backgroundColor: theme.bg,
                        borderWidth: 1,
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: theme.icon,
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        Stomach(11)
                      </Text>
                    </TouchableOpacity> */}
                      </View>
                    ))}
                </View>
            </View>
          )))}
          
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
