# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md) 

## Installation Instructions
This section contains all the packages used in this project and how to install them. However, you can fork this repo and run the following command at the root directory to install all packages.

`yarn` or `npm install`

### Packages

Here are some of the few packages that were installed.

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### morgan 
`npm install --save morgan`
`npm -i -D @types/morgan`

#### jsonwebtoken
`npm install jsonwebtoken --sav`
`npm -i -D @types/jsonwebtoken`

#### jasmine
`npm install jasmine @types/jasmine @ert78gb/jasmine-ts ts-node --save-dev`

#### supertest
`npm i supertest`
`npm i --save-dev @types/supertest`


## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER postgres WITH PASSWORD 'postgres';`

- In psql run the following to create the dev and test database
    - `CREATE DATABASE store_dev;`
    - `CREATE DATABASE store_test;`
    
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c store_dev`
        - `GRANT ALL PRIVILEGES ON DATABASE store_dev TO postgres;`
    - Grant for test database
        - `\c store_test`
        - `GRANT ALL PRIVILEGES ON DATABASE store_test TO postgres;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`yarn migration:run` or `npm run migration:run`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing but not in production. 
```
PORT=3000
NODE_ENV=dev
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = store_dev
POSTGRES_DB_TEST = store_test
POSTGRES_user = postgres
POSTGRES_password = postgres
BCRYPT_PASSWORD = kaylee
SALT_ROUNDS = 10

TOKEN_SECRET = kaylee
TOKEN_TEST = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im9tYXIiLCJmaXJzdG5hbWUiOiJvbWFyIiwibGFzdG5hbWUiOiJvc2FtYSIsImVtYWlsIjoib21hckBnbWFpbC5jb20ifSwiaWF0IjoxNjY1NjgxNjQyfQ.AOodsZtdAU26jkitXJ0i_-K0PgKVplBGV38wjFrjcD0'

```

## Start App
`yarn dev` or `npm run dev`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Token and Authentication
Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`yarn test` or `npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 

## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing. 


### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `yarn test` will set this variable to `testing` in the package.json. Here is the complete command.
`set NODE_ENV=test &&  tsc && db-migrate up  --env test &&  tsc && jasmine && db-migrate reset`
