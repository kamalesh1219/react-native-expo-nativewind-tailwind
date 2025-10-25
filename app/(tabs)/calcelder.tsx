import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Calendar as RNCalendar } from "react-native-calendars";
import Header from "@/components/Header";

export default function Calendar() {
  const [selected, setSelected] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
       <Header title="Calendar" />

        <RNCalendar
          onDayPress={(day) => setSelected(day.dateString)}
          markedDates={{
            [selected]: { selected: true, selectedColor: "#2563eb" },
          }}
        />
        <Text className="text-center mt-4 text-lg text-gray-700">
          Selected: {selected || "None"}
        </Text>

        {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => (true)}
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg mb-24"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
