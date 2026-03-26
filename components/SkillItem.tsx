import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Skill from "../models/skill";

export default function SkillItem({ skill }: { skill: Skill }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(
          `/skillDetailScreen?skillName=${encodeURIComponent(skill.name)}`,
        );
      }}
    >
      <View style={styles.card}>
        <Text style={styles.name}>{skill.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d2d34",
  },
});
