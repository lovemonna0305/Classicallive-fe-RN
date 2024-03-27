import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    FlatList,
    Dimensions,
    StyleSheet ,
    TextInput,
    Alert
  } from "react-native";
  
  import React, { useState, useContext, useEffect } from "react";
  import theme from "../../theme/theme";
  import themeContext from "../../theme/themeContex";
  import { Colors } from "../../theme/color";
  import style from "../../theme/style";
  import { useNavigation } from "@react-navigation/native";
  import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';
  import { AppBar, HStack } from "@react-native-material/core";
  import { Avatar } from "react-native-paper";
  import { useTranslation } from "react-i18next";
  import { color } from "@rneui/base";
  import Icon from "react-native-vector-icons/FontAwesome5";
  import { buycoins } from "../../actions/customer";
  import { server } from "../../constants";
  import { setLoading } from "../../actions/common";
  import Spinner from "../../components/Spinner";
  import { CardField, useStripe, CardForm } from "@stripe/stripe-react-native";
  import { useStore } from "../../store/store";


  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  export default function CustomerPoints() {
    const { changeStore, store } = useStore();
    const { t } = useTranslation();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const keyExtractor = (item) => item.key;
    const {confirmPayment, handleCardAction} = useStripe();

    // const { program } = useSelector((state) => state.customer);
    const currentUser = global.currentUser;
    // const { isLoading } = useSelector((state) => state.common);

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [selectitem, setSelectitem] = useState();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPayment, setModalPayment] = useState(false);
    const [formCompleted, setFormCompleted] = useState(false);
    const [cardDetails, setCardDetails] = useState({
      amount:'',
      number:'',
      cvc:'',
      expiryDate:'',
      country:''
    });

    const coinsdata = [
        {
            "points":100,
            "amount":Math.floor(100*1.1),
        },
        {
            "points":200,
            "amount":Math.floor(200*1.1),
        },
        {
            "points":500,
            "amount":Math.floor(500*1.1),
        },
        {
            "points":1000,
            "amount":Math.floor(1000*1.1),
        },
    ];
    const handlePay = async() => {
      // Logic to handle payment
      // dispatch(setLoading(true));
      // console.log('Processing payment...');
      // setModalPayment(false);
      //   try {
      //     let formdata = new FormData();
      //     formdata.append("amount", selectitem.amount);
      //     formdata.append("points", selectitem.points);
      //     formdata.append("cardNumber", cardNumber);
      //     formdata.append("expiryDate", expiryDate);
      //     formdata.append("cvv", cvv);
      //     console.log(formdata);

      //     await dispatch(buycoins(formdata,{"points":item.points + currentUser.points}));
          
      //     dispatch(setLoading(false));
          
      // } catch (error){
      //     console.log(error)
      // }
      console.log(formCompleted)
      if(formCompleted){
        try {
          const { paymentMethod, error } = await confirmPayment({
            type: 'Card',
            billingDetails: {
              email: 'admin@gmail.com',
            },
            card: {
              number:'4111 1111 1111 1111',
              cvc:123,
              expMonth:'12',
              expYear:'2024'
            },
            amount:110,
          });
          if (error) {
            // setPaymentError(error.message);
            console.log(error)
          } else if (paymentMethod) {
            console.log(paymentMethod);
            // Payment successful, you can handle the success here
            // setPaymentSuccess(true);
          }
        } catch (e) {
          console.log(e)
          // setPaymentError('An error occurred while processing the payment');
        } finally {
          // setPaymentLoading(false);
          console.log('final')
        }
      }
      else{
        Alert.alert('Error', "Invalid Card Form")
      };
    };
    
    
    const renderItem = ({item,index})=> {
        const selectcoins = async (item) =>{
          setSelectitem(item);
          setModalPayment(true);
        }
        return(
            <View key={`post-point${index}`} style={{height:60,padding:5,backgroundColor:theme.box, borderRadius:5, marginBottom:10}}>
              <View style={[style.row,{alignItems:"center", justifyContent:"space-between",paddingTop:5, paddingHorizontal:10}]}>
                <View style={[style.row,{alignItems:"center"}]}>
                  <View style ={{}}>
                    <Image
                    resizeMode="contain"
                      source={require("../../../assets/img/ic_coin.png")}
                      style={{width:40,height:40,}}
                    />
                  </View>
                  <View style={{paddingLeft:10}}>
                    <Text style={style.activetext}>{Math.floor(item.points)}</Text>
                  </View>
                </View>
                <TouchableOpacity style={{backgroundColor:"#D05A35", borderColor:"white",borderRadius:5,borderWidth:1,width:100}}
                  onPress={()=> selectcoins(item)}>
                    <Text style={[style.activetext,{paddingHorizontal:30, paddingVertical:10,textAlign:"center"}]}>{item.amount}</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
    
    const handleFormComplete =(event) =>{
      setFormCompleted(true);
      setCardDetails({...event, amount:selectitem.amount})
    }
  
    return (
      // <SafeAreaView
      //   style={[style.area, { backgroundColor: theme.bg, paddingTop: 40, position:'relative' }]}
      // >
      <>
        {/* <StatusBar backgroundColor={darkMode === true ? '#000':'#fff'} barStyle={darkMode === true  ? 'light-content' : 'dark-content'} translucent={false}/> */}
        <AppBar
          color={theme.bg}
          title={t("purchase_coins")}
          titleStyle={{ color: theme.txt, fontFamily: "Plus Jakarta Sans" }}
          centerTitle={true}
          elevation={0}
          leading={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Avatar.Icon
                icon="arrow-left"
                style={{ backgroundColor: theme.bg }}
                color="white"
                size={40}
            />
            </TouchableOpacity>
          }
        />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          {/* {isLoading && <Spinner />} */}
          <View style={{flex:1}}>
            {/* <Modal
              animationType="fade"
              transparent={true}
              visible={modalPayment}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalPayment(!modalPayment);
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: width,
                  backgroundColor: "#000000aa",
                }}
              >
                <View
                  style={[
                    style.modalcontainer,
                    {
                      backgroundColor: theme.bg,
                      width: width - 30,
                      marginVertical: 170,
                    },
                  ]}
                >
                  <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
                      <View style={{ paddingTop: 10, alignSelf: "center" }}>
                      <Avatar.Icon
                        icon="help"
                        color="#FF4747"
                        size={80}
                        style={{
                          borderWidth: 5,
                          borderColor: "#FF4747",
                          backgroundColor: theme.bg,
                        }}
                      />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                      <Text
                        style={[
                          style.subtxt,
                          { color: Colors.disable, textAlign: "center" },
                        ]}
                      >
                        {t("pay_sure")}
                      </Text>
                    </View>

                    <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("card_number")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="Card Number"
                          value={cardNumber}
                          onChangeText={text => setCardNumber(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("expiry_date")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="Expiry Date (MM/YY)"
                          value={expiryDate}
                          onChangeText={text => setExpiryDate(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Text
                        style={{
                          color: theme.txt,
                          fontWeight: "500",
                          fontFamily: "Plus Jakarta Sans",
                        }}
                      >
                        {t("CVV")}
                      </Text>
                      <View style={{ paddingTop: 8 }}>
                        <TextInput
                          label="CVC"
                          value={cvv}
                          onChangeText={text => setCVV(text)}
                          keyboardType="numeric"
                          inputMode="decimal"
                          selectionColor={Colors.primary}
                          placeholderTextColor={Colors.disable}
                          style={[style.txtinput, { backgroundColor: theme.bg }]}
                          // onChangeText={}
                        />
                      </View>
                    </View>
                    <View style={style.modalbtn_container}>
                      <TouchableOpacity
                        onPress={() => {
                          handlePay();
                        }}
                        style={[style.modalbtn_confirm, { marginRight: 5 }]}
                      >
                        <Text style={style.modalbtn_text}>
                          {t("pay_now")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                        onPress={() => setModalPayment(false)}
                      >
                        <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                      </TouchableOpacity>
                    </View> 
                    
                  </View>
                </View>
              </View>
              
              
            </Modal> */}
            {/* <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            /> */}
            
          <View style={{paddingTop:10}}>
            <Text style={[style.secondarytext,{fontSize:14,textAlign:"center"}]}>{t("purchase_points_desc")}</Text>
          </View>
          <View style={{paddingTop:10, marginBottom:10}}>
            <Text style={[style.secondarytext,{fontSize:14}]}>{t("available_coins")}
              <Text style={[style.activetext,{fontSize:20,marginLeft:10}]}>{currentUser.points}</Text>
            </Text>
          </View>
          <FlatList
              key={1}
              data={coinsdata}
              initialNumToRender={3}
              keyExtractor={(item, index) => {
                return index;
              }}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
          />
          </View>
        </View>    
        {modalPayment&&
          <View style={styles.paymentContainer}>
            <View style={styles.modalContainer}>
              <Icon 
                name="times" 
                size={20}
                style={{marginLeft:'auto'}}
                onPress={()=>setModalPayment(false)}
                // color={focused ? theme.icon : Colors.disable} 
              />
              <View style={styles.priceView}>
                <View style={[styles.priceText, {borderRightColor:'#d9d9d9', borderRightWidth:1}]}>
                  <Text >{t("amount")}</Text>
                  <Text >{selectitem.amount}</Text>
                </View>
                <View style={styles.priceText}>
                  <Text >{t("point")}</Text>
                  <Text >{selectitem.points}</Text>
                </View>
                {/* <Text style={{flex:1}}>{selectitem.points}</Text> */}
              </View>
              <CardForm
                onFormComplete={(event)=>handleFormComplete(event)}
                postalCodeEnabled={true}
                placeholders={{
                  number: '4242 4242 4242 4242',
                  // expiryMonth:'01',
                  // expiryYear:'24',
                  expiryDate:'2024-12',
                  cvc:'123',
                  countryCode:'JP',
                  brand:'master'
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',   
                }}
                defaultValues={{
                  countryCode:'JP',
                  number:'4111 1111 1111 1111'
                }}
                style={[{
                  height: 250,
                  // marginVertical: 30,              
                  // position:'absolute',
                  // bottom:-250 ,

                }, modalPayment&&{bottom:0}]}
              />    
              <View style={style.modalbtn_container}>
                      <TouchableOpacity
                        onPress={() => {
                          handlePay();
                        }}
                        style={[style.modalbtn_confirm, { marginRight: 5 }]}
                      >
                        <Text style={style.modalbtn_text}>
                          {t("pay_now")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[style.modalbtn_cancel, { marginLeft: 5 }]}
                        onPress={() => setModalPayment(false)}
                      >
                        <Text style={style.modalbtn_text}>{t("cancel")}</Text>
                      </TouchableOpacity>
                    </View> 
            </View>
          </View>
        }
      </>  
      // </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    label: {
      marginTop: 10,
      marginBottom: 5,
    },
    button: {
      marginTop: 20,
    },
    paymentContainer:{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,.8)',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      // height: 500,
      height: '100%',
      position:'absolute'
    },
    modalContainer: {
      width: '85%',
      // height: 500,
      // padding: 10
      backgroundColor: 'white',
      height: '50%',
      padding: 10,
      borderRadius:20
    },
    priceView:{
      flexDirection:'row',
      borderBottomColor:"#d9d9d9",
      borderBottomWidth:1,
      // borderTopColor:"#d9d9d9",
      // borderTopWidth:1,
    },
    priceText:{
      color:'black',
      flex:1,
      padding:15,
      justifyContent:'space-between',
      flexDirection:'row'
    }
  });
  