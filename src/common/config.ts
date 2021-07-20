import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({
    path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
});

export const PORT = process.env.PORT;
export const MONGO_CONNECTION_STRING:string = (process.env.MONGO_CONNECTION_STRING as string)
export const JWT_SECRET_KEY:string = (process.env.JWT_SECRET_KEY as string);
