import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import { supabase } from "@/supabase";

export default function Login({ path }: { path: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUpWithEmail = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (!session) console.error("No hay sesión");
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
    setLoading(false);
  };

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } catch (error) {
      console.error("Error durante el login:", error);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
    } catch (error) {
      console.error("Error durante el login con Google:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
    } catch (error) {
      console.error("Error durante el login con Facebook:", error);
    }
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginWithEmail}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleFacebookLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} disabled={loading}>
        <Text style={styles.buttonText} onPress={handleSignUpWithEmail}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: Colors.$gray,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: Colors.$slateBlueColor,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  socialButton: {
    borderColor: "gray",
    backgroundColor: Colors.$gray,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 10,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: Colors.$mediumSlateBlueColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
