import {Student} from "./classes/Student";

export interface Group {
  id: number;
  name: string;
  students: Student[];
}

export let groups = [
  {
    id: 1,
    name: '6402',
    students: []
  },
  {
    id: 2,
    name: '6403',
    students: [
      {
        id: 1,
        name: 'Ivan',
        birthdate: new Date("2009-07-15"),
        num: 1
      },
      {
        id: 3,
        name: 'George',
        birthdate: new Date("1999-06-27"),
        num: 3
      }
    ]
  },
  {
    id: 3,
    name: '6404',
    students: [
      {
        id: 2,
        name: 'Elena',
        birthdate: new Date("1909-05-14"),
        num: 2
      },
    ]
  }
];



