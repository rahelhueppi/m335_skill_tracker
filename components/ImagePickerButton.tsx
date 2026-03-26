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
    width: 130,
    height: 130,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d1d1d6",
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholder: {
    flex: 1,
    backgroundColor: "#ded8e0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#796e7e",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});
