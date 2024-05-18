import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Login from "@/components/Login";
import Colors from "@/constants/Colors";
import { useEffect } from "react";
import { supabase } from "@/supabase";

export default function TabOneScreen() {


  const pruebas = async () => {

    let { data: categories,  } = await supabase
      .from('categories')
      .select('*')
    console.log({categories});

  }

  useEffect(() => {
    (async () => {
      await pruebas()}
    )()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <Login path="app/(tabs)/index.tsx" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.$slateBlueColor,
    height: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginContainer: {
    width: "96%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
  },
});
