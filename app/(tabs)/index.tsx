import { CameraView, BarcodeScanningResult } from "expo-camera"; // Correct type name
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
import { useEffect, useRef, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5lSQxhZp1jXZMF9SwyJkkkSw1eZcvFK895I-KMG9MkFeoue-rEuscsRnTh2AohogH/exec";

export default function Home() {
  const qrLock = useRef(false); // Prevent multiple scans in quick succession
  const appState = useRef(AppState.currentState);

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
        Alert.alert("Success", `Student Name: ${result.name}`);
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
      qrLock.current = true; // Lock to prevent multiple scans
      console.log("Scanned QR Code Data:", data);

      try {
        await sendDataToGoogleSheet(data);
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
