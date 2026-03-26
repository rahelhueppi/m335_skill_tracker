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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d2d34",
  },
  date: {
    fontSize: 14,
    color: "#6c6c80",
  },
  note: {
    fontSize: 15,
    color: "#444",
    marginBottom: 10,
  },
  photo: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    resizeMode: "cover",
    backgroundColor: "#f0f0f5",
  },
});
