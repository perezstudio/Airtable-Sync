export async function fetchBases() {
    // Ensure the API key is read from environment variables
    const apiKey = "pat4IQUYC7k2jo9e0.21c431ea54c16a2c8bf46c768ce769a55a5496db63833f5dbc72d6a172315c41";

    if (!apiKey) {
        console.error('Airtable API key is not set in environment variables.');
        return;
    }

    const response = await fetch('https://api.airtable.com/v0/meta/bases', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch bases from Airtable:', response.status);
        return;
    }

    const data = await response.json();
    return data.bases;
}