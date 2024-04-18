export async function fetchBases() {
    // Ensure the API key is read from environment variables
    const apiKey = "pat4IQUYC7k2jo9e0.bdfb15d3b65f74247b977fda41c03f4437fc1c62b1ee66ad6b08f81befef3293";

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