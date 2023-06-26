export const {
  NODE_ENV = 'development',
  APP_PORT = 3000,
} = process.env;

export const IN_PRODUCTION = NODE_ENV === 'production';
