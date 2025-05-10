import { Request } from "express";
export interface UserWithRole {
    id: string;
    email: string;
    iat?: number;
    exp?: number;
  }
  
  export interface RequestWithLoggedInUser extends Request {
    [x: string]: any;
    user: UserWithRole; // or the actual type of your user
  }
export interface GenerateTokenBodyParams{
    id?:string
    email:string,
    password?:string
}
export interface TokenPayload{
    id?: string;
    email: string;
}
export interface SignUpUserBodyParams{
    email:string,
    password?:string
}
export interface LogOutUserBodyParams{
    email:string
}

export interface ItemSchema{
    title:string,
    description:string,
    status:string,
    dueDate:string,
    id: string,
}

export interface Item{
    title:string,
    description:string,
    status:string,
    dueDate:string,
    owner: string,
}