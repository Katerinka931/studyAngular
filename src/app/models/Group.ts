import {Student} from "./Student";

export interface Group {
  id?: number;
  name?: string;
  students?: Student[];
}
