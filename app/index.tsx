import { FlatList, StyleSheet, Text, View } from "react-native";
import SkillItem from "../components/SkillItem";
import Skill from "../models/skill";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skill Tracker</Text>

      <FlatList
        data={testSkills}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <SkillItem skill={item} />}
      />
    </View>
  );
}

const testSkills: Skill[] = [
  {
    name: "Développé à la seconde",
    goal: 135,
    entries: [
      {
        id: "1",
        date: "2026-03-20",
        photoUri: "file://photo1.jpg",
        value: 110,
        note: "noch nicht ganz stabil",
      },
      {
        id: "2",
        date: "2026-03-22",
        photoUri: "file://photo2.jpg",
        value: 120,
        note: "besserer turnout",
      },
    ],
  },
  {
    name: "Oversplit",
    goal: 10,
    entries: [
      {
        id: "3",
        date: "2026-03-21",
        photoUri: "file://photo3.jpg",
        value: 5,
        note: "mit Blöcken",
      },
      {
        id: "4",
        date: "2026-03-24",
        photoUri: "file://photo4.jpg",
        value: 10,
        note: "Ziel erreicht",
      },
    ],
  },
  {
    name: "Choreo Giselle Variation",
    entries: [
      {
        id: "5",
        date: "2026-03-18",
        photoUri: "file://photo5.jpg",
        note: "erste Durchläufe, unsicher",
      },
      {
        id: "6",
        date: "2026-03-25",
        photoUri: "file://photo6.jpg",
        note: "viel sauberer und sicherer",
      },
    ],
  },
];

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
