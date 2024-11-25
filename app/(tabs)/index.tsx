import { Camera, CameraView, BarcodeScanningResult } from "expo-camera"; // Correct type name
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import Overlay from "./Overlay";
import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false); // Prevent multiple scans in quick succession
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Reset qrLock when app becomes active
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

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (data && !qrLock.current) {
      qrLock.current = true; // Lock to prevent multiple scans
      console.log("Scanned QR Code Data:", data);

      try {
        // Check if data is a URL and open it, else show the data in an alert
        if (data.startsWith("http://") || data.startsWith("https://")) {
          await Linking.openURL(data);
        } else {
          Alert.alert("Scanned Data", data);
        }
      } catch (error) {
        console.error("Error processing QR code:", error);
        Alert.alert("Error", "Unable to process the QR code.");
      } finally {
        // Reset the lock after 1 second
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
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
    </SafeAreaView>
  );
}
