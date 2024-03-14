const mongoose = require('mongoose');
const axios = require('axios');

let mongoDBConnection = null;

// Schema for OAuth tokens
const tokenSchema = new mongoose.Schema({
    accessToken: String,
    refreshToken: String,
    expiryTime: Date
});

// MongoDB model for tokens
const Token = mongoose.model('Token', tokenSchema);

class ZohoCRM {
    /**
     * Constructor for the ZohoCRM integration class.
     * Initializes with MongoDB and Zoho CRM OAuth credentials.
     * @param {string} mongoDBUsername - MongoDB username.
     * @param {string} mongoDBPassword - MongoDB password.
     * @param {string} mongoDBLink - MongoDB cluster link.
     * @param {string} clientId - Zoho CRM client ID.
     * @param {string} clientSecret - Zoho CRM client secret.
     * @param {string} redirectUri - Zoho CRM redirect URI.
     */
    constructor(mongoDBUsername, mongoDBPassword, mongoDBLink, clientId, clientSecret, redirectUri) {
        this.mongoDBUri = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@${mongoDBLink}`;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.baseURL = 'https://accounts.zoho.com/oauth/v2/token';
        this.tokensCollection = 'tokens';
    }

    /**
     * Connects to the MongoDB database using the URI built from constructor parameters.
     */
    async connectToMongoDB() {
        if (!mongoDBConnection) {
            mongoDBConnection = await mongoose.connect(this.mongoDBUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connected to MongoDB successfully.');
        }
        return mongoDBConnection;
    }

    /**
     * Retrieves the currently stored access token from MongoDB.
     * @returns {Promise<string>} The access token.
     */
    async getAccessToken() {
        await this.connectToMongoDB();
        const tokenDoc = await Token.findOne({}).exec();
        if (!tokenDoc || new Date() >= tokenDoc.expiryTime) {
            await this.refreshAccessToken();
            return (await Token.findOne({}).exec()).accessToken;
        }
        return tokenDoc.accessToken;
    }

    /**
     * Refreshes the access token using the refresh token stored in MongoDB and updates the MongoDB storage.
     */
    async refreshAccessToken() {
        await this.connectToMongoDB();
        const tokenDoc = await Token.findOne({}).exec();
        const refreshToken = tokenDoc.refreshToken;
        const response = await axios.post(this.baseURL, null, {
            params: {
                refresh_token: refreshToken,
                client_id: this.clientId,
                client_secret: this.clientSecret,
                redirect_uri: this.redirectUri,
                grant_type: 'refresh_token'
            }
        });

        const { access_token, expires_in } = response.data;
        await Token.updateOne({}, {
            accessToken: access_token,
            expiryTime: new Date(new Date().getTime() + expires_in * 1000)
        });
        console.log('Access token refreshed successfully.');
    }

}

module.exports = ZohoCRM;
