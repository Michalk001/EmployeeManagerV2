## EmployeeManagerV2
 
 ## Installation
 
 - Clone repo or use .zip file
 - `yarn install` to install 
 - `yarn run start` to local start 
 
 ## Usage
 
 - Default addres for `http://localhost:8000/`
 
 
 ## Configuration


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
 - Typescript
