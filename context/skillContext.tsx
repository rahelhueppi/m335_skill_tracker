import Entry from "@/models/entry";
import Skill from "@/models/skill";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SkillContextType {
  skillList: Skill[];
  addSkill: (skill: Skill) => void;
  addEntry: (skillName: string, entry: Entry) => void;
  updateSkill: (name: string, updatedSkill: Skill) => void;
  updateEntry: (id: string, updatedentry: Entry) => void;
  deleteSkill: (name: string) => void;
  deleteEntry: (id: string) => void;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skillList, setSkillList] = useState<Skill[]>([]);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const storedSkills = await AsyncStorage.getItem("skills");

        if (storedSkills !== null) {
          const parsedSkills = JSON.parse(storedSkills);
          setSkillList(parsedSkills);
          console.log("Skills geladen");
        }
      } catch (error) {
        console.log("Fehler beim Laden:", error);
      }
    };
    loadSkills();
  }, []);

  useEffect(() => {
    const saveSkills = async () => {
      try {
        const jsonSkillList = JSON.stringify(skillList);
        await AsyncStorage.setItem("skills", jsonSkillList);
        console.log("Skills gespeichert");
      } catch (error) {
        console.log("Fehler beim Speichern", error);
      }
    };
    saveSkills();
  }, [skillList]);

  const addSkill = (skill: Skill) => {
    setSkillList([...skillList, skill]);
  };

  const addEntry = (skillName: string, entry: Entry) => {
    setSkillList((prevList) =>
      prevList.map((skill) =>
        skill.name === skillName
          ? { ...skill, entries: [...skill.entries, entry] }
          : skill,
      ),
    );
  };

  const updateSkill = (skillName: string, updatedSkill: Skill) => {
    setSkillList((prev) =>
      prev.map((s) => (s.name === skillName ? updatedSkill : s)),
    );
  };

  const deleteSkill = (skillName: string) => {
    setSkillList((prev) => prev.filter((s) => s.name !== skillName));
  };

  const updateEntry = (entryId: string, updatedEntry: Entry) => {
    setSkillList((prevList) =>
      prevList.map((skill) => ({
        ...skill,
        entries: skill.entries.map((entry) =>
          entry.id === entryId ? updatedEntry : entry,
        ),
      })),
    );
  };

  const deleteEntry = (entryId: string) => {
    setSkillList((prevList) =>
      prevList.map((skill) => ({
        ...skill,
        entries: skill.entries.filter((entry) => entry.id !== entryId),
      })),
    );
  };

  return (
    <SkillContext.Provider
      value={{
        skillList,
        addSkill,
        addEntry,
        updateSkill,
        updateEntry,
        deleteSkill,
        deleteEntry,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}

export function useSkill() {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error(
      "useSkill muss innerhalb von VociProvider verwendet werden",
    );
  }
  return context;
}
