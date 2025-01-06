import dotenv from 'dotenv';
dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET || "horizon-secret",
    apiGatewayBaseUrl: process.env.API_GATEWAY_BASE_URL_EXT || "http://localhost:6900",

};