
import * as path from "path";
import * as dotenv from "dotenv";

// 👇 Force dotenv to load from root, not relative to src/
dotenv.config({ path: path.resolve(__dirname, "../.env") })
const _config = {
    port: parseInt(process.env.PORT as string) || 8006,
    host: process.env.HOST || "localhost",
    dbUrl:process.env.DB_URL as string,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "KazaAccessToken",
  jwtAccessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || 900,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || "KazamRefreshToken",
  jwtRefreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || 604800,
}
  const config = Object.freeze(_config);
  
  export default config;
  