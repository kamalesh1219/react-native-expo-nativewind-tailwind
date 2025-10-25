import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const { width } = Dimensions.get("window");

type Task = {
  id: string;
  title: string;
  status: "new" | "scheduled" | "progress" | "completed";
};

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setTasks(parsed);
        else setTasks([]);
      }
    } catch (e) {
      console.log("Error loading tasks:", e);
      setTasks([]);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: "new",
    };
    const updated = [...tasks, newTask];
    saveTasks(updated);
    setNewTaskTitle("");
    setModalVisible(false);
  };

  const changeStatus = (id: string, newStatus: Task["status"]) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const renderColumn = (
    title: string,
    status: Task["status"],
    color: string
  ) => (
    <View
      style={{ width: width / 2.3 }}
      className="mx-2 my-4 bg-gray-100 rounded-2xl p-4"
    >
      <Text
        className="text-xl font-bold mb-3"
        style={{
          color,
          textShadowColor: "#d1d5db",
          textShadowRadius: 3,
        }}
      >
        {title}
      </Text>

      <FlatList
        data={tasks.filter((t) => t.status === status)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-3 rounded-2xl shadow-sm border border-gray-100">
            <Text className="text-gray-800 font-semibold mb-2">
              {item.title}
            </Text>

            <View className="flex-row justify-between items-center">
              <View className="flex-row flex-wrap">
                {["new", "scheduled", "progress", "completed"].map((s) => (
                  <TouchableOpacity
                    key={s}
                    onPress={() => changeStatus(item.id, s as Task["status"])}
                    className={`px-3 py-1 rounded-full mr-2 mb-2 ${
                      item.status === s
                        ? "bg-blue-600"
                        : "bg-gray-200 border border-gray-300"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        item.status === s ? "text-white" : "text-gray-600"
                      }`}
                    >
                      {s === "new"
                        ? "New"
                        : s === "scheduled"
                        ? "Scheduled"
                        : s === "progress"
                        ? "Progress"
                        : "Done"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Ionicons name="trash-outline" size={18} color="#dc2626" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Task Manager" />

      {/* Horizontal Scroll for Columns */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        className="flex-1"
      >
        {renderColumn("New Task", "new", "#2563eb")}
        {renderColumn("Scheduled", "scheduled", "#059669")}
        {renderColumn("In Progress", "progress", "#ca8a04")}
        {renderColumn("Completed", "completed", "#7c3aed")}
      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white w-96 p-5 rounded-2xl">
            <Text className="text-lg font-semibold mb-2">Add New Task</Text>
            <TextInput
              placeholder="Enter task name..."
              className="border border-gray-300 rounded-lg p-2 mb-4"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 rounded-lg mr-2 bg-gray-300"
              >
                <Text>Cancel  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addTask}
                className="px-4 py-2 rounded-lg bg-blue-600"
              >
                <Text className="text-white font-medium">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating Add Button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full p-4 shadow-lg mb-24"
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
