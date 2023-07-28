const configs = {
    core: {
        Name: "bolster",
        Host: "localhost",
        Port: process.env.PORT || 3000
    },
    db: {
        MongoUrl: process.env.MONGO_URL 
    }
}

module.exports = configs