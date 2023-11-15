import * as dotenv from "dotenv";
dotenv.config();

export const databaseConfigs = {
    development: {
        uri: process.env.DEV_DB_URI,
    },
    staging: {
        uri: process.env.STAG_DB_URI,
    },
    production: {
        uri: process.env.PROD_DB_URI,
    },
};