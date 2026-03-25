import SkillDetail from "@/components/SkillEntries";
import { useSkill } from "@/context/skillContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.name}>{skill?.name}</Text>
      {skill?.goal && <Text style={styles.goal}>Ziel: {skill?.goal}</Text>}

      <FlatList
        data={skill?.entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SkillDetail entry={item} />}
      />
    </View>
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
});
