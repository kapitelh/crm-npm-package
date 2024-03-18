const axios = require('axios');

class ZohoCRMConnector {
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.baseURL = 'https://www.zohoapis.com/crm/v2';
    }

    async createLead(leadData, accessToken) {
        try {
            const response = await axios.post(`${this.baseURL}/Leads`, { data: [leadData] }, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Lead created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to create lead in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    async updateLead(leadId, updateData, accessToken) {
        try {
            const response = await axios.put(`${this.baseURL}/Leads/${leadId}`, { data: [updateData] }, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Lead updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to update lead in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    async deleteLead(leadId, accessToken) {
        try {
            const response = await axios.delete(`${this.baseURL}/Leads/${leadId}`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`
                }
            });
            console.log('Lead deleted successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to delete lead in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

}

module.exports = ZohoCRMConnector;
