const fs = require('fs')
const User = require('../src/models/user-model');
const Product = require('../src/models/products')
const Chart = require('../src/models/analytics')
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

        console.log("usercreated:",index)
    }

    const productsData = fileData.products

    for (index in productsData) {
        const productData = productsData[index]
        await Product.create({
            productId: productData.productId,
            productName: productData.productName,
            features: productData.features
        })

        console.log("productdatacreated:", index)
    }

    const chartsData = fileData.analytics
    for (index in chartsData) {
        const chartData = chartsData[index]
        let local = chartData.locals
        if (chartData.locals == undefined) {
            local = ""
        } else {
            local = JSON.stringify(chartData.locals)
        }
        let chart =  Chart.create({
            chartId: chartData.chartId,
            title: chartData.title,
            dataType: chartData.dataType,
            locals: local,
            data: JSON.stringify(chartData.data)
        })

        console.log("chartcreated:",index)
    }
}

loadData()