export interface Student {
  id: number;
  name: string;
  birthdate: Date;
  num: number;
}

export const students = [
  {
    id: 1,
    name: 'Ivan',
    birthdate: new Date("2009-07-15"),
    num: 1
  },
  {
    id: 2,
    name: 'Elena',
    birthdate: new Date("1909-06-27"),
    num: 2
  },
  {
    id: 3,
    name: 'George',
    birthdate: new Date("1999-05-14"),
    num: 3
  }
];
