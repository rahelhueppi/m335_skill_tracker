import EntryDetail from "@/components/EntryDetail";
import Entry from "@/models/entry";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSkill } from "../context/skillContext";

export default function editSkill() {
  const router = useRouter();

  const { entryId } = useLocalSearchParams();

  const { skillList, updateEntry, deleteEntry } = useSkill();

  const entry = skillList
    .flatMap((skill) => skill.entries)
    .find((e) => e.id === entryId);

  if (!entry) {
    return (
      <View>
        <Text>Entry nicht gefunden</Text>
      </View>
    );
  }

  const handleSave = (updatedEntry: Entry) => {
    updateEntry(entry.id, updatedEntry);
    router.back();
  };

  const handleDelete = (id: string) => {
    deleteEntry(id);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <EntryDetail
      initialEntry={entry}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={handleCancel}
    />
  );
}
