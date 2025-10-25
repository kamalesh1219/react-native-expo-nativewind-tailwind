import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Platform } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // we'll handle text manually
        tabBarActiveTintColor: "#2563eb", // blue for active
        tabBarInactiveTintColor: "#9ca3af", // gray for inactive

        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#fff",
          borderTopWidth: 0,
          borderRadius: 10,
          borderBottomLeftRadius : 20,
          borderBottomRightRadius : 20,
          elevation: 0,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8, 
          alignItems: "center",
          height: 70,
          bottom: 20,
        },
      }}
    >
      {/* Schedule Tab */}
      <Tabs.Screen
        name="calcelder"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#2563eb" : "transparent",               
                alignItems: "center",
                borderRadius: 12,
                padding: 6,
                width: 60,
                height: 50,
                marginTop: 28,
               
              }}
            >
              <Ionicons
                name={focused ? "calendar-outline" : "calendar-outline"}
                size={22}
                color={focused ? "#2563eb" : "#6b7280"} // ✅ icon color
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: focused ? "#2563eb" : "black", // ✅ title color change
                  marginTop: 2,
                  width:55,
                }}
              >
              Schedule
              </Text>
            </View>
          ),
        }}
      />

      {/* Kanban Tab */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#2563eb" : "transparent",
                borderRadius: 12,
                alignItems: "center",
                padding: 6,
                width: 60,
                height: 50,
                marginTop: 28,
              }}
            >
              <Ionicons
                name={focused ? "albums" : "albums-outline"}
                size={22}
                color={focused ? "white" : "#6b7280"}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: focused ? "white" : "black",
                  marginTop: 2,
                }}
              >
                Kanban
              </Text>
            </View>
          ),
        }}
      />

      {/* Notes Tab */}
      <Tabs.Screen
        name="notes"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#2563eb" : "transparent",
                borderRadius: 12,
                alignItems: "center",
                padding: 6,
                width: 60,
                height: 50,
                marginTop: 28,
              }}
            >
              <Ionicons
                name={focused ? "document-text" : "document-text-outline"}
                size={22}
                color={focused ? "white" : "#6b7280"}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: focused ? "white" : "black",
                  marginTop: 2,
                }}
              >
                Notes
              </Text>
            </View>
          ),
        }}
      />

      {/* More Tab */}
      <Tabs.Screen
        name="more"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#2563eb" : "transparent",
                borderRadius: 12,
                alignItems: "center",
                padding: 6,
                width: 60,
                height: 50,
                marginTop: 28,
              }}
            >
              <Ionicons
                name={focused ? "ellipsis-horizontal" : "ellipsis-horizontal-outline"}
                size={22}
                color={focused ? "white" : "#6b7280"}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: focused ? "white" : "black",
                  marginTop: 2,
                }}
              >
                More
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
