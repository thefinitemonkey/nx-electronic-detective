import { secrets } from './secrets';

export const environment = {
  production: false,
  mongoUser: secrets.mongoUser,
  mongoPass: secrets.mongoPass,
  mongoEndpoint: secrets.mongoEndpoint,
  mongoOptions: secrets.mongoOptions,
  mongoPrimary: secrets.mongoPrimary,
  mongoSecondary: secrets.mongoSecondary,
};
