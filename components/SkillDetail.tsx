import Skill from "@/models/skill";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SkillDetailProps {
  initialSkill?: Skill; //für Edit-Modus (vorausgefüllt)
  onSave: (skill: Skill) => void;
  onDelete?: (term: string) => void;
  onCancel?: () => void;
}

export default function SkillDetail({
  initialSkill,
  onSave,
  onDelete,
  onCancel,
}: SkillDetailProps) {
  const [name, setName] = useState(initialSkill?.name || "");
  const [goal, setGoal] = useState(initialSkill?.goal);
  const [entries, setEntries] = useState(initialSkill?.entries || []);

  const handleSave = () => {
    //Validierung
    if (!name.trim()) {
      Alert.alert("Fehler", "Bitte den Namen ausfüllen");
      return;
    }

    //Neues Objekt erstellen
    const newSkill: Skill = { name, goal, entries };
    onSave(newSkill);

    //Felder zurücksetzen
    setName("");
    setGoal(0);
    setEntries([]);
  };

  const handleDelete = () => {
    if (onDelete && initialSkill) {
      onDelete(initialSkill.name);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Name"}
        onChangeText={setName}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder={"Ziel (optional)"}
        keyboardType="numeric"
        value={goal?.toString() || ""}
        onChangeText={(text) => setGoal(text === "" ? undefined : Number(text))}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Speichern</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Löschen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Abbrechen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#a2a1a2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
