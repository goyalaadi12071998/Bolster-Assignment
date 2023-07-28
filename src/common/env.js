const availableEnvs = {
    dev: true,
    docker: true,
    prod: false
}

const getEnv = () => {
    let env = process.env.APP_MODE
    if (env == undefined) {
        env = "dev"
    }

    if (!availableEnvs[env]) {
        throw new Error('Env does not exist or not activated')
    }
    
    return env
}

module.exports = getEnv