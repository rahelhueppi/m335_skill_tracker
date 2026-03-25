import SkillDetail from "@/components/SkillDetail";
import { useSkill } from "@/context/skillContext";
import Skill from "@/models/skill";
import { useRouter } from "expo-router";

export default function addSkill() {
  const router = useRouter();
  const { addSkill } = useSkill();

  const handleAdd = (newSkill: Skill) => {
    addSkill(newSkill);
    router.back();
  };

  return <SkillDetail onSave={handleAdd} />;
}
