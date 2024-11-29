import React from "react";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  FlatList,
  Text,
  View,
  Dimensions,
} from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHkBW_TLK5kUBUt91MqUn61aRkXT17zm9m0CCaLTPFw5iyCfCdapvaIDbvHT667xU4/exec";

const { width, height } = Dimensions.get("window");
const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

// Define the type for a Student
type Student = {
  id: string;
  name: string;
  scannedAt?: string; // Optional timestamp
};

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false; // Unlock QR scanning
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const sendDataToGoogleSheet = async (scannedData: string) => {
    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: scannedData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "success") {
        Alert.alert("Success", `Reg. Number: ${result.id}\nStudent Name: ${result.name}\nScanned Time: ${result.time}`);
      } else {
        Alert.alert("Error", result.message || "Student not found");
      }
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
      Alert.alert("Error", "Failed to send data to Google Sheets.");
    }
  };

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      try {
        await sendDataToGoogleSheet(data);
      } finally {
        setTimeout(() => {
          qrLock.current = false;
        }, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Verify ID",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      {/* Overlay component */}
      <Canvas
        style={
          Platform.OS === "android" ? { flex: 1 } : StyleSheet.absoluteFillObject
        }
      >
        <DiffRect inner={inner} outer={outer} color="white" opacity={0.5} />
      </Canvas>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
