import * as dotenv from 'dotenv';
dotenv.config();

// enviroment

const NODE_ENV: string = process.env.NODE_ENV || 'development';

// application

const DOMAIN: string = process.env.DOMAIN || 'localhost';
const PORT: number = +process.env.PORT || 8080;
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 10000;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 10;

// postgres

const POSTGRES_USER = process.env.POSTGRES_USER || 'dev';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'dev';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_DB = process.env.POSTGRES_DB || 'vietjet_data_management';

const POSTGRES_URL =
  process.env.POSTGRES_URL ||
  `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

const environment = {
  development: {
    url: POSTGRES_URL,
  },
  production: {
    url: POSTGRES_URL,
  },
};

const TYPEORM = environment[NODE_ENV];

// jwt

export {
  NODE_ENV,
  DOMAIN,
  PORT,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_URL,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  TYPEORM,
};
