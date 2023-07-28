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
    
    5  Add mongourl in mongoose.connect funtion in load-data.js script
    6. Run node scripts/load-data.js
    7. After completing the script run node src/app.js
    8. Awesome, Now the server is running.

# Note
    1. Some code is commented in src/token/index.js which requires redis implementation so i commented the code.
    2. I did not change the models schema as per my initial conversation with the HR, i have to use the same schema
       and after a day is she told me that i can change so because of this confusion i used the same schema that is given
       in the data.json file in assignment 