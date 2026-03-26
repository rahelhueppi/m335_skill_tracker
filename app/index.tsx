import { useSkill } from "@/context/skillContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import SkillItem from "../components/SkillItem";

export default function Index() {
  const { skillList } = useSkill();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <FlatList
        data={skillList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <SkillItem skill={item} />}
      />

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => router.push("/addSkill")}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8fa",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    height: 60,
    width: 60,
    backgroundColor: "#322d34",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabPressed: {
    backgroundColor: "#665c6a",
  },
  buttonText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 100,
  },
});
