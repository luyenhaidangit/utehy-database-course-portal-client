//Entity
export interface User {
  name: string;
}

//Result
export interface UserCurrent extends User {
  roles: string[];
}
