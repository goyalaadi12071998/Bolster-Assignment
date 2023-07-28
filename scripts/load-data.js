const fs = require('fs')
const User = require('../src/models/user-model');
const Product = require('../src/models/products')
const Chart = require('../src/models/analytics')
const mongoose = require('mongoose');

const loadData = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log("Database Connected")

    const data = () => fs.readFileSync(__dirname + '/../data.json', {encoding: 'utf-8'});
    const fileData = JSON.parse(data())
    const usersData = fileData.users

    for (index in usersData) {
        const userData = usersData[index]
        const existingUser = await User.find({email: userData.email})
        if(existingUser) {
            continue
        } else {
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
            local = JSON.stringify({})
        } else {
            local = JSON.stringify(chartData.locals)
        }
        await Chart.create({
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