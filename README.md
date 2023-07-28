# Bolster-Assignment

# How to run this project
    1. Clone this repo
    2. Create a .env file in the root and add conf

        ```
        MONGO_URL=
        PORT=
        ```
    
    3. Run npm install
    4. A data.json file is already exist with some data if you want to add some different data update the file
        with the new data and check the data format should be same.
    
    5  Add mongourl in mongoose.connect funtion in load-data.js script in place of *mongoUri*
    6. Run node scripts/load-data.js
    7. After completing the script run node src/app.js
    8. Awesome, Now the server is running.

# Note
    1. Some code is commented in src/token/index.js which requires redis implementation so i commented the code.
    2. Because of time boundation i did not integrate redis in this to store access token and refresh token in db 
    3. All the validation of access token and refresh token is done without the use of redis and also necessary comments added