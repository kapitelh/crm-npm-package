
# ZohoCRMConnector

The `ZohoCRMConnector` npm package provides a simplified interface for interacting with Zoho CRM, enabling operations such as creating, updating, deleting, and fetching leads. It handles authentication through OAuth access tokens and offers both individual and bulk operations.

## Prerequisites

Before using this package, ensure you have:
- A Zoho CRM account.
- Registered your application with Zoho CRM to obtain `clientId`, `clientSecret`, and `redirectUri`.
- Generated an OAuth access token through Zoho CRM.

## Installation

To install the package, run the following command in your project directory:

```bash
npm install @kapitelh/crm-package
```

## Usage

Here's how you can use the `ZohoCRMConnector` package to perform various operations with Zoho CRM:

### Initialization

First, create an instance of the ZohoCRMConnector class:

```javascript
const ZohoCRMConnector = require('@kapitelh/crm-package');

const zohoCRM = new ZohoCRMConnector(clientId, clientSecret, redirectUri);
```

Replace `clientId`, `clientSecret`, and `redirectUri` with your actual Zoho CRM OAuth credentials.

### Creating a Lead

To create a new lead:

```javascript
const leadData = {
  // Your lead data here
};

const accessToken = 'your_access_token';

zohoCRM.createLead(leadData, accessToken)
  .then(response => console.log('Lead created:', response))
  .catch(error => console.error('Error creating lead:', error));
```

### Updating a Lead

To update an existing lead:

```javascript
const leadId = 'your_lead_id';
const updateData = {
  // Your update data here
};

zohoCRM.updateLead(leadId, updateData, accessToken)
  .then(response => console.log('Lead updated:', response))
  .catch(error => console.error('Error updating lead:', error));
```

### Deleting a Lead

To delete a lead:

```javascript
zohoCRM.deleteLead(leadId, accessToken)
  .then(response => console.log('Lead deleted:', response))
  .catch(error => console.error('Error deleting lead:', error));
```

### Bulk Create Leads

```javascript
const leadsData = [/* array of lead data objects */];

zohoConnector.bulkCreateLeads(leadsData, accessToken)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### Bulk Update Leads

```javascript
const leadsUpdates = [/* array of objects containing lead IDs and their corresponding update data */];

zohoConnector.bulkUpdateLeads(leadsUpdates, accessToken)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```

### Bulk Delete Leads

```javascript
const leadIds = [/* array of lead IDs to delete */];

zohoConnector.bulkDeleteLeads(leadIds, accessToken)
    .then(response => console.log(response))
    .catch(error => console.error(error));
```


## Support

If you encounter any issues or have feature requests, please open an issue on the GitHub repository.

## License

This project is licensed under the MIT License.
