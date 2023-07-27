const Respond = (req, res, payload, error) => {
    if (error != null) {
        res.status(error.statusCode).send({
            success: false,
            message: error.desciption,
            code: error.code
        })
    }

    return res.status(200).send({
        success: true,
        data: payload
    })  
}

module.exports = Respond