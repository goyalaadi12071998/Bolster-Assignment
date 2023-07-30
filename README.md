# Bolster-Assignment

# How to run this project
    1. Clone this repo
    2. Create a .env file in the root and add conf

        ```
        MONGO_URL=
        PORT=
        ```
    
    3. Run npm install
    4. A data.json file already exists with some data if you want to add some different data update the file
        with the new data and check the data format should be the same.
    
    5  Add mongourl in mongoose.connect function in load-data.js script in place of *mongoUri*
    6. Run node scripts/load-data.js
    
    7. After completing the script run node src/app.js
    8. Awesome, Now the server is running.
    9. If step 7 does not works for you , then add PORT and MongoURl in docker-compose.yaml file
    10. Run docker-compose up --build

# Dependencies Used
    1. Express
    2. Morgan
    3. Helmet
    4. Cors
    5. Cookie-Parser
    6. Body-Parser
    7. JsonWebTokens
    8. Express-Mongo-Sanitize
    9. Xss-clean
    10. Bcrypt
    11. Redis