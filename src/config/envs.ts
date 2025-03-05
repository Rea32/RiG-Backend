import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asUrlString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    CLIENT_ID: get('VITE_IGDB_API_CLIENTID').required().asString(),
    IGDB_API_KEY: get('VITE_IGDB_API_KEY').required().asString(),
    AWS_ACCESS_KEY_ID: get('AWS_ACCESS_KEY_ID').required().asString(),
    AWS_SECRET_ACCESS_KEY: get('AWS_SECRET_ACCESS_KEY').required().asString(),
    AWS_REGION: get('AWS_REGION').required().asString(),
    BUCKET_NAME: get('BUCKET_NAME').required().asString(),
}