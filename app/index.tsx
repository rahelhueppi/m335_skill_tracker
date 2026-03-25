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
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
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
