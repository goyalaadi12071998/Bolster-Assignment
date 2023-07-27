const devConfigs = require('./dev-config')
const dockerConfigs = require('./docker-config')

const availableConfigs = {
    dev: devConfigs,
    stage: dockerConfigs,
}

const getConfigs = (env) => {
    return availableConfigs[env]
}

module.exports = getConfigs