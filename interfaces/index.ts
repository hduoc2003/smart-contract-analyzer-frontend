// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
import { ResultType } from "./results";

export interface Userdata {
  _id: string
  name: string
  username: string
  role: string 
  email: string
}

export interface LoginFormState {
  username: string;
  password: string;
}

export interface SignupFormState {
  name: string;
  username: string;
  email: string;
  password: string;
}
