import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../theme/theme";
import { Colors } from "./color";
import themeContext from "./themeContex";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  textalign: {
    textAlign: "right",
  },
  text1: {
    fontSize: 20,
    fontSize: 48,
    fontWeight: 700,
    color: "#4A6C00",
    paddingLeft: 20,
    display: "flex",
  },
  outcardtxt: {
    fontFamily: "Poppins",
    color: "#4D4D4D",
    fontSize: 14,
    fontWeight: 400,
    paddingTop: 0,
    paddingLeft: 15,
  },
  text2: {
    color: Colors.primary,
    fontWeight: 'normal',
    paddingTop: 18,
    lineHeight: 5,
    fontSize: 12,
  },
  viewstyle: {
    flex: 1,
    paddingTop: 20,
    display: "flex",
    backgroundColor: "#F7F6F6",
  },
  btn: {
    fontSize: 10,
    fontWeight: 500,
    backgroundColor: "#4A6C00",
    borderRadius: 8,
  },
  area: {
    flex: 1,
    // paddingHorizontal: 20,
    // fontFamily:'Itim-Regular'
  },
  main: {
    flex: 1,
    backgrondColor: "white",
    marginHorizontal: 20,
    fontFamily: "Plus Jakarta Sans",
  },

  introtext: {
    // fontSize: 32,
    // fontWeight: "700",
    // color: Colors.secondary,
    fontFamily: "Plus Jakarta Sans",
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: 700,
    lineHeight: 40,
    letterSpacing: 1.3,
    textAlign: "left",
  },
  title: {
    // fontSize: 32,
    // fontWeight: "700",
    // color: Colors.secondary,
    fontFamily: "Plus Jakarta Sans",
    fontSize: 24,
    color: Colors.secondary,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 1.3,
    textAlign: "left",
  },
  txt: {
    fontFamily: "Plus Jakarta Sans",
    fontStyle: "normal",
    color: Colors.secondary,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 30,
    letterSpacing: 0.08,
  },
  welcometxt: {
    fontFamily: "Poppins",
    paddingLeft: 10,
    fontStyle: "normal",
    color: "black",
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 30,
    letterSpacing: 0.08,
  },
  btn: {
    backgroundColor: Colors.btn,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    // fontFamily:'Itim-Regular'
  },
  cardbtn: {
    backgroundColor: Colors.btn,
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    // fontFamily:'Itim-Regular'
  },
  btntxt: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "Plus Jakarta Sans",
  },
  cardbtntxt: {
    fontSize: 10,
    color: Colors.secondary,
    fontFamily: "Plus Jakarta Sans",
    padding: 3,
  },
  indicator: {
    borderColor: "#BDBDBD",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#BDBDBD",
    marginHorizontal: 1,
    paddingHorizontal: 20,
    padding: 3,
  },
  logintitle: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Plus Jakarta Sans",
  },
  txt1: {
    fontSize: 16,
    color: Colors.disable,
    fontFamily: "Plus Jakarta Sans",
    lineHeight: 30,
  },
  txtinput: {
    // backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderColor: Colors.bord,
    color: Colors.disable,
    height: 50,
    fontFamily: "Plus Jakarta Sans",
  },

  radio: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: Colors.bord,
    color: Colors.disable,
    fontFamily: "Plus Jakarta Sans",
  },

  radioYesNo: {
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: Colors.bord,
    color: Colors.disable,
    fontFamily: "Plus Jakarta Sans",
  },

  divider: {
    height: 1,
    backgroundColor: Colors.disable,
    width: 55,
  },

  divider1: {
    height: 1,
    backgroundColor: Colors.bord,
    marginTop: 20,
    marginBottom: 25,
  },

  dividertxt: {
    color: Colors.disable,
    fontFamily: "Plus Jakarta Sans",
  },

  btn1: {
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 70,
    flexDirection: "row",
    justifyContent: "center",
  },
  btn2: {
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#4A6C00",
  },
  btntxt1: {
    fontSize: 16,
    color: Colors.active,
    paddingLeft: 15,
    fontFamily: "Plus Jakarta Sans",
  },
  title1: {
    fontSize: 40,
    fontWeight: 800,
    fontStyle: "italic",
    fontFamily: "Plus Jakarta Sans",
    lineHeight: 50,
    letterSpacing: 0.08,
  },
  title2: {
    fontFamily: "Plus Jakarta Sans",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.08,
  },
  subtitle: {
    // fontSize: 20,
    // fontWeight: "600",
    // fontFamily: "Plus Jakarta Sans",
    fontFamily: "Plus Jakarta Sans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 32,
    alignItems: "center",
    letterSpacing: 0.08,
  },
  subtxt: {
    fontSize: 14,
    color: Colors.disable,
    lineHeight: 20,
    fontFamily: "Plus Jakarta Sans",
  },
  categoryTextSelected: {
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#227C70",
    // fontFamily:'Itim-Regular'
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    // fontFamily:'Itim-Regular'
  },
  categorycontainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "space-between",
    // fontFamily:'Itim-Regular'
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.bord,
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 50,
    // fontFamily:'Itim-Regular'
  },
  btn3: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: "#227C70",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    // fontFamily:'Itim-Regular'
    // paddingHorizontal:10
  },
  verticaldivider: {
    height: "40%",
    width: 1,
  },
  modalcontainer: {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // flex: 1,
    borderRadius: 20,
    paddingHorizontal: 30,
    marginVertical: 140,
    paddingTop: 50,
    paddingBottom: 5,
    marginHorizontal: 10,
    alignSelf: "center",
    // fontFamily:'Itim-Regular'
  },
  btnoutline: {
    borderColor: Colors.bord,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    // fontFamily:'Itim-Regular'
  },
  modalbtn_container: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalbtn_confirm: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 12,
    // borderWidth: 1,
    borderRadius: 30,
    backgroundColor: Colors.btn,
    textAlign: "center",
  },
  modalbtn_text: {
    fontSize: 14,
    color: "white",
    fontFamily: "Plus Jakarta Sans",
    textAlign: "center",
  },
  modalbtn_cancel: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 12,
    // borderWidth: 1,
    borderRadius: 30,
    backgroundColor: Colors.coins,
    textAlign: "center",
  },
  txtInbox: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 20,
    paddingHorizontal: 1,
    marginLeft: 2,
    marginRight: 2,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.bord,
    color: Colors.disable,
  },
  txtList: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
    alignItems: "center",
    letterSpacing: 0.08,
  },
  accsettingtxtbox: {
    // backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderColor: Colors.bord,
    color: Colors.disable,
    height: 40,
    fontFamily: "Plus Jakarta Sans",
  },
  firsttxt: {
    fontSize: 15,
    fontWeight: 600,
  },
  secondtxt: {
    fontSize: 15,
    fontWeight: 400,
  },
  bottomlinestyle: {
    flex: 1,
    marginTop: 10,
    borderBottomColor: "#A1A1A1",
    borderBottomWidth: 1,
    padding: 5,
  },
  img: {
    borderRadius: 5,
  },
  activetext: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  secondarytext: {
    paddingRight: 2,
    color: "#8A9A9D",
    fontSize: 12,
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    // flex:1,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    height: 50,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.btn,
  },
  buttonCancel: {
    backgroundColor: Colors.cancel,
  },
  textStyle: {
    paddingTop: 5,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalwidth: {
    width: width - 100,
  },
  // HomePage RenderItem
  item1: {
    // backgroundColor: "#1b2123",
    backgroundColor: Colors.itemback,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    flexDirection: "row",
    margin: 1,
    height: 60,
    width: 90,
    paddingRight: 10,
    marginHorizontal: 5,
    marginVertical: 4,
    borderRadius: 4,
  },
  item2: {
    height: 200,
    flex: 1,
    marginRight: 25,
  },
  bottompage_container: {
    height: 50,
    paddingHorizontal: 50,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  statusContainer: {
    paddingHorizontal: 8,
    backgroundColor: Colors.green,
    borderRadius: 3,
  },

});
