# CocktailCalc

A web app to calculate cocktails for specific events

## Configuration

The configuration is done via a `.env` file.
Please copy the file `.env.example` and rename it to `.env`.
More information about the individual confirmation values can be found in [
`env.validation.ts`](/server/common/env.validation.ts) file.

Note that values marked with `(client dev only)` are only read in development mode. In production mode, the values must
be given as node environment variables via the command line (e.g. `PORT=3001 npm run start:client`).
`(client dev only)` values are only necessary for the client.

## Development

Follow this steps assuming you have installed Node.js and npm:

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `npm run build` to build everything (You can also run `npm run build:client`, `npm run build:server` or
   `npm run build:db` to build individual parts)
4. Run `npm run start:server` to start the server
5. Run `npm run start:client` to start the client
