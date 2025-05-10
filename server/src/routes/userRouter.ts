import express, { RequestHandler } from "express"

import { createItem, loginUser, logOutUser, signUpUser } from "../controllers/userController";
import { ValidateCreateItemBodyParams, ValidateLoginUserBodyParams, ValidateLogOutUserBodyParams, validateSignUpUserBodyParams } from "../middlewares/middleware";
import { authenticateUser } from "../utilities/authorization.js";

const userRoutes=express.Router();

userRoutes.post('/signup',validateSignUpUserBodyParams,signUpUser)
userRoutes.post('/login',ValidateLoginUserBodyParams,loginUser)
userRoutes.post('/logout',ValidateLogOutUserBodyParams,logOutUser)
// userRoutes.post('/add-item',[ValidateCreateItemBodyParams,authenticateUser],createItem)


export default userRoutes;