import { NODE_ENV, POSTGRES_URL } from '@environments';

const orm = {
  development: {
    url: POSTGRES_URL,
  },
  testing: {
    url: POSTGRES_URL,
  },
  production: {
    url: POSTGRES_URL,
  },
};

export default orm[NODE_ENV];
