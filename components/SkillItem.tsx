import { StyleSheet, Text, View } from "react-native";
import Skill from "../models/skill";

export default function SkillItem({ skill }: { skill: Skill }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{skill.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#fff",
    padding: 20,
    marginTop: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
});
