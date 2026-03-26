import { SkillProvider } from "@/context/skillContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SkillProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#322d34",
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
