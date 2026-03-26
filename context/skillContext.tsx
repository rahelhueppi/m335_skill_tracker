import Entry from "@/models/entry";
import Skill from "@/models/skill";
import { createContext, ReactNode, useContext, useState } from "react";

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
  const [skillList, setSkillList] = useState<Skill[]>([
    {
      name: "Développé à la seconde",
      goal: 135,
      entries: [
        {
          id: "1",
          date: "2026-03-20",
          mediaUri: "file://photo1.jpg",
          value: 110,
          note: "noch nicht ganz stabil",
        },
        {
          id: "2",
          date: "2026-03-22",
          mediaUri: "file://photo2.jpg",
          value: 120,
          note: "besserer turnout",
        },
      ],
    },
    {
      name: "Oversplit",
      goal: 10,
      entries: [
        {
          id: "3",
          date: "2026-03-21",
          mediaUri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWZL7-RjhrSQVB9RS-PbGbCyzfWkYVEKI1A&s",
          value: 5,
          note: "mit Blöcken",
        },
        {
          id: "4",
          date: "2026-03-24",
          mediaUri:
            "https://i.redd.it/working-on-oversplits-and-wanted-to-share-my-progress-the-v0-nw4zsi7y488a1.jpg?width=3468&format=pjpg&auto=webp&s=057e78785a04ce3a50e404ea14c41776531cc943",
          value: 10,
          note: "Ziel erreicht",
        },
      ],
    },
    {
      name: "Choreo Giselle Variation",
      entries: [
        {
          id: "5",
          date: "2026-03-18",
          mediaUri: "file://photo5.jpg",
          note: "erste Durchläufe, unsicher",
        },
        {
          id: "6",
          date: "2026-03-25",
          mediaUri: "file://photo6.jpg",
          note: "viel sauberer und sicherer",
        },
      ],
    },
  ]);

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
    setSkillList((prev) => prev.filter((s) => s.name === skillName));
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
