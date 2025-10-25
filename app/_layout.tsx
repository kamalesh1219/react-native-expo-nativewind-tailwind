import 'react-native-reanimated';
import "../global.css";

import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  // Defines your main tab navigator folder
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Your bottom tabs group */}
        <Stack.Screen name="(tabs)" />

        {/* Optional modal screen */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
            headerShown: true,
            headerTitleAlign: "center",
          }}
        />
      </Stack>

      {/* Status bar adapts automatically */}
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

