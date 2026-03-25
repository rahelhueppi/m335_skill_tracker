import Entry from "./entry";

interface Skill {
  name: string;
  goal?: number;
  entries: Entry[];
}

export default Skill;
