import { useSkill } from "@/context/skillContext";
import { FlatList, StyleSheet, View } from "react-native";
import SkillItem from "../components/SkillItem";

export default function Index() {
  const { skillList } = useSkill();
  return (
    <View style={styles.container}>
      <FlatList
        data={skillList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <SkillItem skill={item} />}
      />
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
});
