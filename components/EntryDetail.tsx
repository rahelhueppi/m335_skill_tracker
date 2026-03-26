import Entry from "@/models/entry";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePickerButton from "./ImagePickerButton";

interface EntryDetailProps {
  initialEntry?: Entry; //für Edit-Modus (vorausgefüllt)
  onSave: (entry: Entry) => void;
  onDelete?: (term: string) => void;
  onCancel?: () => void;
}

export default function EntryDetail({
  initialEntry,
  onSave,
  onDelete,
  onCancel,
}: EntryDetailProps) {
  const generateId = () => Math.random().toString(36).substr(2, 10);

  const getToday = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const [id, setId] = useState(initialEntry?.id || generateId);
  const [date, setDate] = useState(initialEntry?.date || getToday);
  const [mediaUri, setPhotoUri] = useState(initialEntry?.mediaUri || "");
  const [value, setValue] = useState(initialEntry?.value);
  const [note, setNote] = useState(initialEntry?.note);

  const handleSave = () => {
    //Neues Objekt erstellen
    const newEntry: Entry = { id, date, mediaUri, value, note };
    onSave(newEntry);

    //Felder zurücksetzen
    setId("");
    setDate("");
    setPhotoUri("");
    setValue(0);
    setNote("");
  };

  const handleDelete = () => {
    if (onDelete && id) {
      onDelete(id);
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
        placeholder={"DD.MM.YYYY"}
        onChangeText={setDate}
        value={date}
      />

      <TextInput
        style={styles.input}
        placeholder={"Wert (optional)"}
        keyboardType="numeric"
        value={value?.toString() || ""}
        onChangeText={(text) =>
          setValue(text === "" ? undefined : Number(text))
        }
      />

      <ImagePickerButton
        mediaUri={mediaUri}
        onImageSelected={(uri) => setPhotoUri(uri)}
      />

      <TextInput
        style={styles.input}
        placeholder={"Notiz (optional)"}
        onChangeText={setNote}
        value={note}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Speichern</Text>
      </TouchableOpacity>

      {initialEntry && (
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>Löschen</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Abbrechen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f8fa",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#a7a2a9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
