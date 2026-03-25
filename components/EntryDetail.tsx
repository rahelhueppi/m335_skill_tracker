import Entry from "@/models/entry";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EntryDetailProps {
  initialEntry?: Entry; //für Edit-Modus (vorausgefüllt)
  onSave: (entry: Entry) => void;
  /*onDelete?: (term: string) => void;
  onCancel?: () => void;*/
}

export default function EntryDetail({
  initialEntry,
  onSave,
  /*onDelete,
  onCancel,*/
}: EntryDetailProps) {
  const [id, setId] = useState(initialEntry?.id || ""); //TODO: id generieren, nicht user Input
  const [date, setDate] = useState(initialEntry?.date || "");
  const [photoUri, setPhotoUri] = useState(initialEntry?.photoUri || "");
  const [value, setValue] = useState(initialEntry?.value);
  const [note, setNote] = useState(initialEntry?.note);

  const handleSave = () => {
    //Neues Objekt erstellen
    const newEntry: Entry = { id, date, photoUri, value, note };
    onSave(newEntry);

    //Felder zurücksetzen
    setId("");
    setDate("");
    setPhotoUri("");
    setValue(0);
    setNote("");
  };

  return (
    <View style={styles.container}>
      {/*TODO: Id automatisch setzen*/}
      <TextInput style={styles.input} placeholder={"Id"} onChangeText={setId} />

      {/*TODO: autofill mit aktuellem Datum*/}
      <TextInput
        style={styles.input}
        placeholder={"DD.MM.YYYY"}
        onChangeText={setDate}
      />

      {/*TODO: Bild hochladen, nicht URL*/}
      <TextInput
        style={styles.input}
        placeholder={"Foto-URL"}
        onChangeText={setPhotoUri}
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

      <TextInput
        style={styles.input}
        placeholder={"Notiz (optional)"}
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Speichern</Text>
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
  saveButton: {
    backgroundColor: "#a2a1a2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
