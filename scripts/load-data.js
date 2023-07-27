const fs = require('fs')
const User = require('../src/models/user-model');
const mongoose = require('mongoose');

const loadData = async () => {
    await mongoose.connect("mongodb+srv://goyalaadesh461:11710461Aa@cluster0.pykajlg.mongodb.net/?retryWrites=true&w=majority");
    
    console.log("Database Connected")

    const data = () => fs.readFileSync(__dirname + '/../data.json', {encoding: 'utf-8'});
    const fileData = JSON.parse(data())
    const usersData = fileData.users

    for (index in usersData) {
        const userData = usersData[index]

        await User.create({
            email: userData.email,
            displayname: userData.displayname,
            username: userData.username,
            firstname: userData.firstname,
            lastname: userData.lastname,
            profile: userData.profile,
            organization: userData.organization,
            dob: userData.dob,
            charts: userData.charts,
            productFeatures: userData.productFeatures,
            password: userData.password
        })

        console.log("created:",index)
    }
}

loadData()