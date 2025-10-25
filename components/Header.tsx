import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback,TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Header({ title }: { title: string }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;

  // Animate sidebar in/out
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSidebarVisible ? 0 : -width,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSidebarVisible]);

  return (
    <>
      {/* Header Bar */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        {/* Menu Button */}
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu" size={26} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-lg font-semibold text-gray-900">{title}</Text>

        {/* Placeholder for alignment */}
        <View className="w-6" />
      </View>

      {/* Sidebar & Overlay */}
      {isSidebarVisible && (
        <TouchableWithoutFeedback onPress={() => setSidebarVisible(false)}>
          <View className="absolute inset-0 bg-black/50 z-40 " />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={{ left: slideAnim }}
        className="absolute top-0 bottom-0 w-80 bg-[#0b1a3f] px-4 py-6 z-50"
      >
       
        {/* Sidebar Content */}
        
       <SafeAreaView >
        <View className="flex-row items-center justify-between  mb-4">
             <View className="flex-row items-center">
               <View className="bg-purple-600 rounded-full w-8 h-8 items-center justify-center mr-3">
                <Text className="text-white font-bold">K</Text>
               </View>
              <Text className="text-white text-xl font-semibold">InfiniGoal</Text>
             </View>
          
           {/* Close Button */}
            <TouchableOpacity onPress={() => setSidebarVisible(false)} className="">
             <Ionicons name="close" size={26} color="white" />
            </TouchableOpacity>
         </View>

        <View className="border-b border-gray-500 mb-4" />

        <View className="bg-[#414f75] rounded-md px-4 py-2 mb-4">
         <TextInput   
           className="text-gray-200"        
           placeholder=" Search..."
           placeholderTextColor="#cbd5e1"
        />
        </View>

        {/* Projects */}
        <Text className="text-gray-300 mb-4 mt-4">Projects</Text>
        <TouchableOpacity className="flex-row items-center ml-2">
          <Ionicons name="add" size={18} color="white" />
          <Text className="text-white ml-2 text-base">Create project</Text>
        </TouchableOpacity>
       </SafeAreaView>  
      </Animated.View>
    </>
  );
}
