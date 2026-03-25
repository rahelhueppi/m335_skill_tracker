import EntryDetail from "@/components/EntryDetail";
import { useSkill } from "@/context/skillContext";
import Entry from "@/models/entry";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function addEntry() {
  const router = useRouter();
  const { skillName } = useLocalSearchParams();
  const { addEntry } = useSkill();

  const handleAdd = (newEntry: Entry) => {
    //Validation
    if (typeof skillName !== "string") {
      throw new Error("skillName fehlt oder ist ungültig");
    }

    addEntry(skillName, newEntry);
    router.back();
  };

  return <EntryDetail onSave={handleAdd} />;
}
