const fs = require('fs')
const User = require('../src/models/user-model');
const Product = require('../src/models/products')
const Chart = require('../src/models/analytics')
const mongoose = require('mongoose');

const connectMongoDb = async () => {
    await mongoose.connect(mongoUri);
    console.log("Database Connected")
}

const loadFileData = async () => {
    await connectMongoDb()

    const data = () => fs.readFileSync(__dirname + '/../data.json', {encoding: 'utf-8'});
    const fileData = JSON.parse(data())

    const users = fileData.users

    for (var i = 0 ; i < users.length; i++) {
        const user = users[i]
        const existingUser = await User.findOne({email: user.email})
        if (existingUser) {
            console.log('User Already Exist')
        } else {
            const newuser = await User.create({
                email: user.email,
                displayname: user.displayname,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profile: user.profile,
                organization: user.organization,
                dob: user.dob,
                charts: user.charts,
                productFeatures: user.productFeatures,
                password: user.password
            })   

            console.log('User Created :', newuser._id)
        }
    }



    const products = fileData.products
    for (var i = 0 ; i < products.length; i++) {
        const product = products[i]
        const newproduct = await Product.create({
            productId: product.productId,
            productName: product.productName,
            features: product.features
        })

        console.log('Product Created: ',newproduct._id)
    }


    const charts = fileData.analytics
    for (var i = 0 ; i < charts.length; i++) {
        const chart = charts[i]
        let local = chart.locals
        
        if (chart.locals == undefined) {
            local = JSON.stringify({})
        } else {
            local = JSON.stringify(chart.locals)
        }
        
        const newchart = await Chart.create({
            chartId: chart.chartId,
            title: chart.title,
            dataType: chart.dataType,
            locals: local,
            data: JSON.stringify(chart.data)
        })

        console.log("Chart Data Created: ",newchart._id)
    }

    return console.log('Complete data loaded in database')
}

loadFileData()
