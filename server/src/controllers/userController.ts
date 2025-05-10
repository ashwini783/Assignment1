import { Request, Response } from "express";
import { addItem, login, logout, signUp } from "../services/userService";
import mongoose from "mongoose";
import { RequestWithLoggedInUser } from "../types/index";

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await signUp(req?.body);
      res.status(200).json({
        status: "Success",
        message: "User SignUp Successfully!",
      });
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status((err?.statusCode as number) || 500).json({
        status: "Failed",
        message: err?.message || "Failed To Sign Up",
      });
    }
  };

  export const loginUser = async (req: Request, res: Response)=> { 
    try {
     const response= await login(req?.body);
      res.status(200).json({
        status: "Success",
        message: "User Login Successfully!",
        data:response
      });
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status((err?.statusCode as number) || 500).json({
        status: "Failed",
        message: err?.message || "Failed To Login",
      });
    }
  };


  export const logOutUser = async (req: Request, res: Response): Promise<void> => { 
    try {
       await logout(req?.body.email);
      res.status(200).json({
        status: "Success",
        message: "User Logged Off Successfully!",
      });
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status((err?.statusCode as number) || 500).json({
        status: "Failed",
        message: err?.message || "User Logged Off Successfully!",
      });
    }
  };

  export const createItem = async (req: RequestWithLoggedInUser, res: Response): Promise<void> => { 
    try {
        const data=req.body;
        data["userId"]=req.user.id;
       const response=await addItem(data);
      res.status(200).json({
        status: "Success",
        message: "User Logged Off Successfully!",
        data:response
      });
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status((err?.statusCode as number) || 500).json({
        status: "Failed",
        message: err?.message || "User Logged Off Successfully!",
      });
    }
  };