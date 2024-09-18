import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  FRONTEND_PORT: Joi.number()
    .port()
    .default('3000')
    .description(
      'The port the frontend server should listen on (client dev only)',
    ),

  BACKEND_PORT: Joi.number()
    .port()
    .default('3001')
    .description('The port the backend server should listen on'),

  BACKEND_ENDPOINT_URL: Joi.string()
    .default('http://localhost:3001/')
    .uri()
    .description(
      'The URL of the backend server api endpoint (client dev only)',
    ),

  DATABASE_URL: Joi.string()
    .default('file:./dev.db')
    .description(
      'The URL of the database. Supports SQLite, MySQL, MariaDB, Postgres, and MSSQL connection strings. Note that you have to modify the Prisma schema file to match the database type.',
    ),
});
