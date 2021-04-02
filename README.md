#  Installiation and 

1. Install Node.js if not installed yet.
2. Install dependencies with
```bash
npm install
```
3. Run migrations:
```bash
# for development server
npx knex migrate:latest --knexfile src/db/conf.js --env development
# for production server
npx knex migrate:latest --knexfile src/db/conf.js --env production
# for testing
npx knex migrate:latest --knexfile src/db/conf.js --env test
```
4. Add .env file in the root directory of the project.
```
ENV={environment, possible values: dev, prod, test}
PORT={server output port}
SECRET_KEY={server secret key}

# variables for production

DB_NAME={database name}
DB_USER={database user}
DB_PASS={database password}
DB_HOST={database host}
DB_PORT={database port}
```
5. Start server:
```bash
# starts development server with nodemon
npm run dev
# starts production server with node
npm start
```