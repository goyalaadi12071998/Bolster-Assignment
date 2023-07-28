const configs = {
    core: {
        Name: "bolster",
        Host: "localhost",
        Port: process.env.PORT || 3000
    },
    db: {
        MongoUrl: "mongodb+srv://<username>:<password>@cluster0.pykajlg.mongodb.net/?retryWrites=true&w=majority" 
    }
}

module.exports = configs