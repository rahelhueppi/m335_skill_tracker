import { SkillProvider } from "@/context/skillContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SkillProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ac95a8",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Meine Skills",
          }}
        />
        <Stack.Screen
          name="skillDetailScreen"
          options={{
            title: "Details",
          }}
        />
      </Stack>
    </SkillProvider>
  );
}
