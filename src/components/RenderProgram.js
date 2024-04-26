import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";


export const RenderProgram = async () => {

  // const selectProgram = async (item) => {
  //   try {
  //     await dispatch(setProgram(item))

  //   }catch(error){
  //     console.log(error)
  //   }
  //   navigation.navigate("CustomerPostDetail");
  // };
  
  const dispatch = useDispatch();
  const { programs, program} = useSelector((state) => state.customer);

  console.log("number", programs.length, index);
  const navigation = useNavigation();

  // if (item.empty) {
  //   return <View style={[styles.item1, styles.itemTransparent]} />;
  // }
  
  return (
    <View>
      <FlatList
            data={programs}
            keyExtractor={(item) => item.id}
            ref={ref}
            numColumns={2}
            renderItem={({item, index}) => {

              const lastItem = index === programs.length - 1;
              console.log("item",item)
                return (
                  <View>
                  <Text>123</Text>
                </View>
                )
              

              // <TouchableOpacity
              //     style={[styles.item1, { flex: 1, maxWidth: lastItem ? "47%" : "100%" }]}
              //     onPress={(item) => selectProgram(item)}
              //   >
              //     <View>
              //       <Image
              //         // source={{ uri: item.image_file }}
              //         style={{ width: 60, height: 60, borderRadius: 3 }}
              //       />
              //     </View>
              //     <View>
              //       <Text
              //         style={{
              //           marginTop: 8,
              //           fontWeight: 800,
              //           color: theme.txt,
              //           fontSize: 10,
              //         }}
              //       >
              //         {item.title}
              //       </Text>
              //       <Text style={{ color: theme.txt }}>03/03 10:10</Text>
              //     </View>
              //   </TouchableOpacity>
            }}
            // renderItem={renderItem2}
            key={2}   // add key to prevent error from being thrown
          />
    </View>
    
  );
};



const styles = StyleSheet.create({
  item1: {
    backgroundColor: "#436369",
    alignItems: "center",
    justifyContent: "space-between",
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
  itemTransparent: {
    backgroundColor: "transparent",
  },
  itemText: {
    color: "#fff",
  },
  item2: {
    height: 100,
    flex: 1,
    marginHorizontal: 5,
  },
});

// import React from "react";
// import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
// import Swiper from "react-native-swiper";
// import { useNavigation } from "@react-navigation/native";
// import { NavigationContainer } from "@react-navigation/native";

// import { setProgram } from "../actions/customer";


// export const RenderProgram = async ({ item, index }) => {
//   console.log("intex",index)

//   const selectProgram = async (item) => {
//     try {
//       await dispatch(setProgram(item))

//     }catch(error){
//       console.log(error)
//     }
//     navigation.navigate("CustomerPostDetail");
//   };
  


//   const dispatch = useDispatch();
//   const { programs } = useSelector((state) => state.customer);

//   console.log("number", programs.length, index);
//   const navigation = useNavigation();

//   if (item.empty) {
//     return <View style={[styles.item1, styles.itemTransparent]} />;
//   }
//   const lastItem = index === 41 - 1;
//   return (
//     <TouchableOpacity
//       style={[styles.item1, { flex: 1, maxWidth: lastItem ? "47%" : "100%" }]}
//       onPress={(item) => selectProgram(item)}
//     >
//       <View>
//         <Image
//           // source={{ uri: item.image_file }}
//           style={{ width: 60, height: 60, borderRadius: 3 }}
//         />
//       </View>
//       <View>
//         <Text
//           style={{
//             marginTop: 8,
//             fontWeight: 800,
//             color: theme.txt,
//             fontSize: 10,
//           }}
//         >
//           {item.title}
//         </Text>
//         <Text style={{ color: theme.txt }}>03/03 10:10</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   item1: {
//     backgroundColor: "#436369",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flex: 1,
//     flexDirection: "row",
//     margin: 1,
//     height: 60,
//     width: 90,
//     paddingRight: 10,
//     marginHorizontal: 5,
//     marginVertical: 4,
//     borderRadius: 4,
//   },
//   itemTransparent: {
//     backgroundColor: "transparent",
//   },
//   itemText: {
//     color: "#fff",
//   },
//   item2: {
//     height: 100,
//     flex: 1,
//     marginHorizontal: 5,
//   },
// });

// // export default ProgramList;
