import SkillDetail from "@/components/SkillDetail";
import Skill from "@/models/skill";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useSkill } from "../context/skillContext";

export default function editSkill() {
  const router = useRouter();

  const { skillName } = useLocalSearchParams();

  const { skillList, updateSkill, deleteSkill } = useSkill();

  const skill = skillList.find((s) => s.name === skillName);

  if (!skill) {
    return (
      <View>
        <Text>Skill nicht gefunden</Text>
      </View>
    );
  }

  const handleSave = (updatedSkill: Skill) => {
    updateSkill(skill.name, updatedSkill);
    router.back();
  };

  const handleDelete = (name: string) => {
    deleteSkill(name);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SkillDetail
      initialSkill={skill}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={handleCancel}
    />
  );
}
