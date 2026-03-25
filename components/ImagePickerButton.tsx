import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImagePickerButtonProps {
  mediaUri?: string; // Aktuelles Bild (optional)
  onImageSelected: (uri: string) => void; // Callback wenn Bild gewählt
}

export default function ImagePickerButton({
  mediaUri,
  onImageSelected,
}: ImagePickerButtonProps) {
  const pickImage = async () => {
    Alert.alert("Foto", "Option auswählen", [
      {
        text: "Foto aufnehmen",
        onPress: async () => {
          // Permissions anfragen
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Fehler", "Kamera-Zugriff benötigt!");
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images" /*, "videos"*/],
            quality: 0.5,
          });
          if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
          }
        },
      },
      {
        text: "Aus Galerie wählen",
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Fehler", "Zugriff auf Galerie benötigt!");
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images" /*, "videos"*/],
            quality: 0.5,
          });
          if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
          }
        },
      },
      {
        text: "Abbrechen",
        style: "cancel",
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      {mediaUri ? (
        <Image source={{ uri: mediaUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Bild hinzufügen</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#666",
    textAlign: "center",
  },
});
