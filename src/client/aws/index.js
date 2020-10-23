module.exports = {
    ...require('./aws'),
    ...require('./simpleCredentialProvider'),
    ...require('./ssmCredentialProvider')
}