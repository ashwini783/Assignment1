import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { HttpError } from "../errors/index.js";
import { RequestWithLoggedInUser } from "../types/index.js";
import { userModel } from "../models/userModel.js";

export const getUserDetailsByUserId = async (id: string) => {
  try {
     const user = await userModel.findOne({ id })
    return user;
  } catch (error) {
    const err = error as { statusCode?: number; message?: string };
    throw new HttpError(400, err?.message || "Failed To Get User Details");
  }
};

export const authenticateUser = async (req: RequestWithLoggedInUser, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers?.authorization?.split(" ")[1];
    const refreshToken = req.headers?.["x-refresh-token"] as string;
      if (!accessToken) return res.status(401).json({ message: "Access token required" });
      if (!refreshToken) return res.status(401).json({ message: "Refresh token required" });
      try {
        const decodedAccessToken = jwt.verify(accessToken, config?.jwtAccessTokenSecret as string) as any;
        const user = await getUserDetailsByUserId(decodedAccessToken["userId"] as string);
        if (!user) return res.status(403).json({ message: "Unauthorized" });
        req.user = decodedAccessToken;
        return next();
      } catch (error) {
        if (error instanceof Error && error.name === "TokenExpiredError") {
          try {
            const decodedRefreshToken = jwt.verify(
              refreshToken,
              config?.jwtRefreshTokenSecret as string,
            ) as any
            const user = await getUserDetailsByUserId(decodedRefreshToken["id"] as string);
            if (!user) return res.status(403).json({ message: "Invalid refresh token" });
            delete decodedRefreshToken["exp"];
            delete decodedRefreshToken["iat"];
            const newAccessToken = jwt.sign(decodedRefreshToken, config.jwtAccessTokenSecret as string, {
              expiresIn: Number(config.jwtAccessTokenExpiry),
            });
            res.setHeader("authorization", newAccessToken);
            req.user = decodedRefreshToken;
            return next();
          } catch (refreshError) {
            return res.status(403).json({ status: "failed", message: "Unauthorized", error: refreshError });
          }
        }
        return res.status(403).json({ status: "failed", message: "Unauthorized", error });
      }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};
