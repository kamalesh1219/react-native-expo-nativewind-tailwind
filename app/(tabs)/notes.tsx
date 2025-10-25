import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNotes = async (newNotes: any) => {
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const addNote = () => {
    if (!text.trim()) return;
    const newNotes = [...notes, { id: Date.now().toString(), text }];
    saveNotes(newNotes);
    setText("");
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter((n: any) => n.id !== id);
    saveNotes(newNotes);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <Header title="Notes" />
      
      <View className="p-4">
        <View className="flex-row mb-4">
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
            placeholder="Write a note..."
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            onPress={addNote}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-gray-100 rounded-lg p-3 mb-2">
              <Text className="text-gray-700">{item.text}</Text>
              <TouchableOpacity onPress={() => deleteNote(item.id)}>
                <Text className="text-red-500 font-bold">X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
