import SkillDetail from "@/components/SkillEntries";
import { useSkill } from "@/context/skillContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function skillDetailScreen() {
  const router = useRouter();
  const { skillName } = useLocalSearchParams();
  const { skillList } = useSkill();

  const skill = skillList.find((v) => v.name === skillName);

  if (!skill) {
    router.back();
    //TODO: Errormeldung
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                if (!skill) return;
                router.push(
                  `/editSkill?skillName=${encodeURIComponent(skill.name)}`,
                );
              }}
              style={{ marginRight: 15 }}
            >
              <Text style={{ marginLeft: 5, color: "#000000", fontSize: 16 }}>
                Edit
              </Text>
            </Pressable>
          ),
          title: skill?.name ?? "Skill Details",
        }}
      />

      <View style={styles.container}>
        <Text style={styles.name}>{skill?.name}</Text>
        {skill?.goal && <Text style={styles.goal}>Ziel: {skill?.goal}</Text>}

        <FlatList
          data={skill?.entries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SkillDetail entry={item} />}
        />

        <Pressable
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
          onPress={() => {
            if (!skill) return;
            router.push(
              `/addEntry?skillName=${encodeURIComponent(skill.name)}`,
            );
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goal: {
    fontSize: 15,
    color: "#444",
  },
  fab: {
    position: "absolute",
    bottom: 50,
    right: 50,
    height: 60,
    width: 60,
    backgroundColor: "#433c70",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,

    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabPressed: {
    position: "absolute",
    bottom: 50,
    right: 50,
    height: 60,
    width: 60,
    backgroundColor: "#867fad",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,

    shadowColor: "#000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 35,
    color: "#ffffff",
    marginBottom: 4,
    fontWeight: "bold",
  },
});
