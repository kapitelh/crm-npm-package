const ZohoCRMConnector = require('./ZohoCRMConnector');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

const clientId = 'yourClientId';
const clientSecret = 'yourClientSecret';
const redirectUri = 'yourRedirectUri';
const accessToken = 'yourAccessToken';

const zohoCRM = new ZohoCRMConnector(clientId, clientSecret, redirectUri);

describe('ZohoCRMConnector', () => {
    describe('createLead', () => {
        it('should create a lead successfully', async () => {
            const leadData = { Company: 'Test Company', Last_Name: 'Doe', First_Name: 'John', Email: 'john.doe@example.com' };
            mock.onPost(`${zohoCRM.baseURL}/Leads`).reply(200, {
                data: [{ details: leadData }]
            });

            const response = await zohoCRM.createLead(leadData, accessToken);
            expect(response).toBeDefined();
            expect(response.data[0].details).toEqual(leadData);
        });
    });

    // Add tests for updateLead, deleteLead, bulkCreateLeads, bulkUpdateLeads, and bulkDeleteLeads
    // following a similar pattern to the createLead test above.
});

afterAll(() => {
    mock.restore();
});
