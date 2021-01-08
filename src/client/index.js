module.exports = {
    SimpleOsduClient: require('./simple'),
    ...require('./aws'),
    ...require('./service')
}