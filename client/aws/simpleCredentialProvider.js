const { AWSOsduBaseCredentialProvider } = require('./baseCredentialProvider');

class AWSOsduSimpleCredentialProvider extends AWSOsduBaseCredentialProvider {
    constructor(username, password) {
        super();
        this._username = username;
        this._password = password;
    }

    async GetCredentials() {
        return {
            username: this._username,
            password: this._password
        };
    }
}

module.exports.AWSOsduSimpleCredentialProvider = AWSOsduSimpleCredentialProvider;