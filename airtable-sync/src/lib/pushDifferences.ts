async function applyDifferences(differences, apiKey) {

    const makeApiCall = async (url, method, body) => {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response.json();
    };
    
    // Handle creation of tables and fields
    for (const item of differences.Create) {
        if (item.type === 'table') {
            await makeApiCall(`https://api.airtable.com/v0/meta/bases/{baseId}/tables`, 'POST', item.json);
        } else {
            await makeApiCall(`https://api.airtable.com/v0/meta/bases/{baseId}/tables/${item.tableId}/fields`, 'POST', item.json);
        }
    }
    
    // Handle updates to tables and fields
    for (const item of differences.Update) {
        if (item.type === 'table') {
            await makeApiCall(`https://api.airtable.com/v0/meta/bases/{baseId}/tables/${item.id}`, 'PATCH', item.json);
        } else {
            await makeApiCall(`https://api.airtable.com/v0/meta/bases/{baseId}/tables/${item.tableId}/fields/${item.id}`, 'PATCH', item.json);
        }
    }
}