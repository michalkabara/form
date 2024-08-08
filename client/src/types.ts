export interface User {
  id: number;
  continent: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface UserWithoutId extends Omit<User, "id"> {}
