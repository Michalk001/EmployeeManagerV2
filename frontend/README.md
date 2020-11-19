## EmployeeManagerV2
 
 ## Installation
 
 - Clone repo or use .zip file
 - Open backend directory in Command-line
 - `yarn install` to install 
 - `yarn run dev` to local start 
 - Open frondend directory in Command-line
 - `yarn install` to install 
 - `yarn run start` to local start 
 
 ## Usage
 
 - Default addres for frondend `http://localhost:8000/`
 - Default addres for backend `http://localhost:8003/`
 - File `configInitUser` contains default user which create when table `User` in database is empty
 
 
 ## Configuration
 
 ### Backend
 
 - Rename `ormconfig.example.json` to `ormconfig.json`
 - Set connection data to databse in `ormconfig.json`
 Example ormconfig.json
 
 ``` 
 {
    "type": "mysql",
    "host": "YOUT_HOST",
    "port": 3306,
    "username": "****",
    "password": "****",
    "database": "****",
    "synchronize": true,
    "logging": false,
    "extra": { "insecureAuth": true },
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }
 ```
 File `AppConfig` contains jwtSecret
 
 Example AppConfig.json
 ```
 {
     "jwtSecret": "@QEGTUI"
 }
 ```
 
 ### Frondend
 
 Path to `config.json`: `src/utiles/config.json`
 
 config.json allows to set password and account policy to valid on frontend
 
 Example config.json
 
 ``` 
 {
   "API_URL": "http://localhost:8003",
   "POLICY": {
     "PASSWORD": {
       "LEAST_LENGTH": 8,
       "LEAST_ONE_NUMBER": true,
       "DIFFERENT_USERNAME": true,
       "LEAST_ONE_UPPERCASE": true,
       "LEAST_ONE_LOWERCASE": true
 
     },
     "ACCOUNT": {
       "REQUIRED_EMAIL": true
     }
   }
 }
 
 ```
 
 - API_URL - url to backend server
 
 ## Technologies
 
 - React
 - NodeJS
 - Typescript
