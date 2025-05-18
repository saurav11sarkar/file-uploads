import path from "path";
import dotenv from "dotenv";
dotenv.config({path:path.resolve(process.cwd(),".env")})

export default{
    port:process.env.PORT,
    dbUrl:process.env.DB_URL,
    cloudinary_cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET,
    jwt_secret:process.env.JWT_SECRET,
    jwt_expires_in:process.env.JWT_EXPIRES_IN,
    jwt_refresh_token_expires_in:process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
}
