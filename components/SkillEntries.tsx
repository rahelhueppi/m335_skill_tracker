import Entry from "@/models/entry";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SkillEntries({ entry }: { entry: Entry }) {
  const router = useRouter();
  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push(`/editEntry?entryId=${encodeURIComponent(entry.id)}`)
      }
    >
      <View style={styles.row}>
        <Text style={styles.value}>{entry.value}</Text>
        <Text style={styles.date}>{entry.date}</Text>
      </View>

      <Text style={styles.note}>{entry.note}</Text>

      {entry.mediaUri ? (
        <Image source={{ uri: entry.mediaUri }} style={styles.photo} />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  note: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
  },
  //TODO: Bilder im Querformat sollen nicht abgeschnitten werden
  photo: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
