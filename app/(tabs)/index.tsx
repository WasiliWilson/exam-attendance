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
} from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera"; // Correct type name
import { Stack } from "expo-router";
import Overlay from "./Overlay";
import { useEffect, useRef, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHkBW_TLK5kUBUt91MqUn61aRkXT17zm9m0CCaLTPFw5iyCfCdapvaIDbvHT667xU4/exec";

// Define the type for a Student
type Student = {
  id: string;
  name: string;
  scannedAt?: string; // Optional timestamp
}

export default function Home() {
  const qrLock = useRef(false); // Prevent multiple scans in quick succession
  const appState = useRef(AppState.currentState);
  {/*const [students, setStudents] = useState([]); // State to store scanned students*/}
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

  const fetchScannedStudents = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getScannedStudents`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "success") {
        setStudents(result.students); // Set the list of students
      } else {
        Alert.alert("Error", result.message || "Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching scanned students:", error);
      Alert.alert("Error", "Failed to fetch scanned students.");
    }
  };

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
        fetchScannedStudents(); // Update the student list after a scan
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

      <View style={styles.listContainer}>
        <Text style={styles.headerText}>Scanned Students</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.studentItem}>
              <Text style={styles.studentText}>ID: {item.id}</Text>
              <Text style={styles.studentText}>Name: {item.name}</Text>
              <Text style={styles.studentText}>Time: {item.scannedAt}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  studentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  studentText: {
    fontSize: 16,
    color: "#000",
  },
});
