import SkillDetail from "@/components/SkillDetail";
import Skill from "@/models/skill";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function skillDetailScreen() {
  const router = useRouter();
  const { skillName } = useLocalSearchParams();

  const skill = testSkills.find((v) => v.name === skillName);

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
        photoUri:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWZL7-RjhrSQVB9RS-PbGbCyzfWkYVEKI1A&s",
        value: 5,
        note: "mit Blöcken",
      },
      {
        id: "4",
        date: "2026-03-24",
        photoUri:
          "https://i.redd.it/working-on-oversplits-and-wanted-to-share-my-progress-the-v0-nw4zsi7y488a1.jpg?width=3468&format=pjpg&auto=webp&s=057e78785a04ce3a50e404ea14c41776531cc943",
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
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goal: {
    fontSize: 15,
    color: "#444",
  },
});
