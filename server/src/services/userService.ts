import { HttpError } from "../errors";
import { userModel } from "../models/userModel";
import {createItemSchema} from "../models/itemModel"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GenerateTokenBodyParams, Item, ItemSchema, TokenPayload } from "../types";
import config from "../config";

const generateJwtToken = async (data: GenerateTokenBodyParams): Promise<string[]> => {
    try {
      const payload: TokenPayload = {
        id: data.id,
        email: data.email,
      };
      console.log(config?.jwtAccessTokenSecret ," and ",config.jwtRefreshTokenSecret)
      const accessToken: string = jwt.sign(payload, config?.jwtAccessTokenSecret as string, {
        expiresIn: Number(config?.jwtAccessTokenExpiry),
      });
      const refreshToken: string = jwt.sign(payload, config.jwtRefreshTokenSecret as string, {
        expiresIn: Number(config?.jwtRefreshTokenExpiry),
      });
      console.log(accessToken, " and ", refreshToken)
      return [accessToken, refreshToken];
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      
      throw new HttpError(400, err?.message || "Failed To Generate Token");
    }
  };

 const checkUserDetail=async(data:any)=>{
    const user = await userModel.findOne({ email: data.email })
    if(!user){
        throw new HttpError(404, "User Not Found");
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if(!isPasswordValid){
        throw new HttpError(401, "Invalid Password");
    }
    return user;
 } 

export const signUp=async(data:any)=>{
    try{
        const userExist = await userModel.findOne({ email: data.email });
        if(userExist){
            throw new HttpError(400, "Email Is Already Registered");
        }
        const saltRounds = 10;
         const hashedPassword: string = await bcrypt.hash(data?.password, saltRounds);
         const newUser = new userModel({
            email: data.email,
            password: hashedPassword,
          });
          await newUser.save();
    }
    catch(error){
        const err = error as { statusCode?: number; message?: string };
        throw new HttpError(400, err?.message || "Failed To Sign Up User");
    }
}

export const login=async(data:any)=>{
    try{
        const user = await checkUserDetail(data);
        console.log("user is ",user)
        const [accessToken, refreshToken]: string[] = await generateJwtToken(user);
        console.log(accessToken, " and ", refreshToken)
        await userModel.updateOne({ email: user.email }, { refreshToken });
        return {
            user: {
              email: data.email,
              profileImageUrl: data.profileImageUrl ? data.profileImageUrl : null,
            },
            accessToken,
            refreshToken,
          };
    }
    catch(error){
        const err = error as { statusCode?: number; message?: string };
        throw new HttpError(400, err?.message || "Failed To Login User");
    }
}

export const logout=async(email:string)=>{
    try{
        await userModel.updateOne({ email }, { $unset: { refreshToken: 1 } });
        return;
    }
    catch(error){
        const err = error as { statusCode?: number; message?: string };
        throw new HttpError(400, err?.message || "Failed To Logout User");
    }
}

export const addItem=async(data:ItemSchema)=>{
    try{
        const { title, description, status, dueDate,id } = data;
    
        const newItem = new createItemSchema({
          title,
          description,
          status,
          dueDate,
          owner: id,
        });
    
        const savedItem = await newItem.save();
        return savedItem
    }
    catch(error){
        const err = error as { statusCode?: number; message?: string };
        throw new HttpError(400, err?.message || "Failed To Create Item");
    }
}