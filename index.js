const axios = require('axios');

class ZohoCRMConnector {
    /**
     * Constructor for the ZohoCRMConnector class.
     * @param {string} clientId - The client ID for Zoho CRM OAuth application.
     * @param {string} clientSecret - The client secret for Zoho CRM OAuth application.
     * @param {string} redirectUri - The redirect URI for Zoho CRM OAuth application.
     */
    constructor(clientId, clientSecret, redirectUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.baseURL = 'https://www.zohoapis.com/crm/v2';
    }

    /**
     * Creates a new lead in Zoho CRM.
     * @param {Object} leadData - The data of the lead to create.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
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

    /**
     * Updates an existing lead in Zoho CRM.
     * @param {string} leadId - The ID of the lead to update.
     * @param {Object} updateData - The data to update the lead with.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
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

    /**
     * Deletes an existing lead from Zoho CRM.
     * @param {string} leadId - The ID of the lead to delete.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
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

    /**
     * Creates multiple leads in Zoho CRM in a single request.
     * @param {Array<Object>} leadsData - An array of lead data objects to create.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
    async bulkCreateLeads(leadsData, accessToken) {
        try {
            const response = await axios.post(`${this.baseURL}/Leads`, { data: leadsData }, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Leads created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to create leads in bulk in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    /**
     * Updates multiple leads in Zoho CRM in a single request.
     * @param {Array<Object>} leadsUpdates - An array of objects containing lead IDs and their corresponding update data.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
    async bulkUpdateLeads(leadsUpdates, accessToken) {
        try {
            const response = await axios.put(`${this.baseURL}/Leads`, { data: leadsUpdates }, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Leads updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to update leads in bulk in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    /**
     * Deletes multiple leads from Zoho CRM in a single request.
     * @param {Array<string>} leadIds - An array of lead IDs to delete.
     * @param {string} accessToken - The OAuth access token for authorization.
     * @returns {Promise<Object>} The response from Zoho CRM API.
     */
    async bulkDeleteLeads(leadIds, accessToken) {
        try {
            const response = await axios.delete(`${this.baseURL}/Leads`, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: { ids: leadIds.join(',') }
            });
            console.log('Leads deleted successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to delete leads in bulk in Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    /**
     * Retrieves details of a specific lead from Zoho CRM.
     *
     * @param {string} leadId - The ID of the lead to retrieve.
     * @param {string} accessToken - The access token for authorization.
     * @returns {Promise<Object>} The lead details from Zoho CRM.
     */
    async getLead(leadId, accessToken) {
        try {
            const response = await axios.get(`${this.baseURL}/Leads/${leadId}`, {
                headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
            });
            console.log('Lead details retrieved successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to retrieve lead details from Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    /**
     * Retrieves a list of leads from Zoho CRM. Can include filtering and pagination parameters.
     *
     * @param {string} accessToken - The access token for authorization.
     * @param {Object} params - Optional parameters for filtering, sorting, and pagination.
     * @returns {Promise<Object>} The list of retrieved leads from Zoho CRM.
     */
    async getBulkData(accessToken, params = {}) {
        try {
            const response = await axios.get(`${this.baseURL}/Leads`, {
                headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
                params: params // Can include parameters for filtering, sorting, or pagination
            });
            console.log('Leads retrieved successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to retrieve leads from Zoho CRM:', error.response ? error.response.data : error);
            throw error;
        }
    }

    /**
     * Retrieves leads from Zoho CRM based on specific criteria.
     *
     * @param {string} accessToken - The access token for authorization.
     * @param {Object} filterParams - Parameters to filter the leads by.
     * @returns {Promise<Object>} The filtered list of leads from Zoho CRM.
     */
    async getFilteredLeads(accessToken, filterParams) {
        return this.getBulkData(accessToken, filterParams);
    }


}

module.exports = ZohoCRMConnector;
