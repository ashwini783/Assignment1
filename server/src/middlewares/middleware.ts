import { HttpError } from "../errors";
import { NextFunction, Request, Response } from "express";
import { createUserItemSchema, logOutUserSchema, signUpUserSchema } from "../validators/userValidator";
export const validateSignUpUserBodyParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = signUpUserSchema.validate(req?.body);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status(err?.statusCode || 400).json({
        status: "Failed",
        message: err?.message || "Failed To Validate SignUp User Body Params",
      });
    }
  };

  export const ValidateLoginUserBodyParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = signUpUserSchema.validate(req?.body);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status(err?.statusCode || 400).json({
        status: "Failed",
        message: err?.message || "Failed To Validate Login User Body Params",
      });
    }
  };
  export const ValidateLogOutUserBodyParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = logOutUserSchema.validate(req?.body);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status(err?.statusCode || 400).json({
        status: "Failed",
        message: err?.message || "Failed To Validate Logout User Body Params",
      });
    }
  };

  export const ValidateCreateItemBodyParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = createUserItemSchema.validate(req?.body);
      if (error) {
        throw new HttpError(400, error.details[0].message);
      }
      next();
    } catch (error) {
      const err = error as { statusCode?: number; message?: string };
      res.status(err?.statusCode || 400).json({
        status: "Failed",
        message: err?.message || "Failed To Validate Create item Schema",
      });
    }
  };