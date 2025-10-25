import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

export default function More() {
  const resetData = async () => {
    await AsyncStorage.clear();
    Alert.alert("Reset", "All tasks and notes cleared!");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
       <Header title="More" />
       
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          onPress={resetData}
          className="bg-red-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white text-lg font-semibold">Reset All Data</Text>
        </TouchableOpacity>
        <Text className="mt-6 text-gray-500">Task Manager v1.0</Text>
      </View>
    </SafeAreaView>
  );
}
