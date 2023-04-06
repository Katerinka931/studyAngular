import {Group} from "../group/group";

export class Student {
  id?: number;
  name?: string;
  number?: number;
  birthdate?: Date;

  group_id?: number;

  selectedGroup?: Group;
}
