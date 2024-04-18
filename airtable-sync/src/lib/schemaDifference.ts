import { json } from "@sveltejs/kit";

// Function to compare base schemas
function compareBaseSchemas(selectedBaseSchema: any, receivingBaseSchema: any) {
    const differences = {
        Create: [],
        Update: [],
        Delete: [],
        CreateLinked: [],
        CreateFormula: [],
        UpdateLinked: [],
        UpdateFormula: []
    };
    
    console.log(selectedBaseSchema);
    console.log(receivingBaseSchema);

    // Check tables to create or update
    selectedBaseSchema.forEach(table => {
        const foundTable = receivingBaseSchema.find(t => t.name === table.name);
        console.log(foundTable);
        if (!foundTable) {
            // Table not found, add to create
            differences.Create.push({
                name: table.name,
                type: 'table',
                json: table // Assuming `table` contains all necessary data
            });
        } else {
            // Table found, check for updates
            if (!areTableDetailsEqual(table, foundTable)) {
                differences.Update.push({
                    name: foundTable.name,
                    id: foundTable.id,
                    type: 'table',
                    json: table // Include the necessary update details
                });
            }
            // Check fields within the found table
            compareTableFields(table, foundTable, differences);
        }
    });

    // Check tables and fields to delete
    receivingBaseSchema.forEach(table => {
        if (!selectedBaseSchema.some(t => t.name === table.name)) {
            // Table in receivingBase not found in selectedBase, add to delete
            differences.Delete.push({
                name: table.name,
                id: table.id,
                type: 'table'
            });
        } else {
            const correspondingTable = selectedBaseSchema.find(t => t.name === table.name);
            table.fields.forEach(field => {
                if (!correspondingTable.fields.some(f => f.name === field.name)) {
                    // Field in receivingBase not found in selectedBase, add to delete
                    differences.Delete.push({
                        name: field.name,
                        id: field.id,
                        type: field.type
                    });
                }
            });
        }
    });

    return differences;
}

// Function to compare fields within two tables
function compareTableFields(selectedTable, receivingTable, differences) {
    selectedTable.fields.forEach(field => {
        const foundField = receivingTable.fields.find(f => f.name === field.name);
        if (!foundField) {
            // Field not found, add to create
            if (field.type === 'formula') {
                differences.CreateFormula.push({
                    name: field.name,
                    type: field.type,
                    tableId: receivingTable.id,
                    json: field
                });
            } else if (field.type === 'link') {
                differences.CreateLinked.push({
                    name: field.name,
                    type: field.type,
                    tableId: receivingTable.id,
                    json: field
                });
            } else {
                differences.Create.push({
                    name: field.name,
                    type: field.type,
                    tableId: receivingTable.id,
                    json: field
                });
            }
        } else {
            // Field found, check for updates
            if (!areFieldDetailsEqual(field, foundField)) {
                if (field.type === 'formula') {
                    differences.UpdateFormula.push({
                        name: foundField.name,
                        id: foundField.id,
                        type: field.type,
                        tableId: receivingTable.id,
                        json: field
                    });
                } else if (field.type === 'link') {
                    differences.UpdateLinked.push({
                        name: foundField.name,
                        id: foundField.id,
                        type: field.type,
                        tableId: receivingTable.id,
                        json: field
                    });
                } else {
                    differences.Update.push({
                        name: foundField.name,
                        id: foundField.id,
                        type: field.type,
                        tableId: receivingTable.id,
                        json: field
                    });
                }
            }
        }
    });
}

// Utility functions to check equality of table or field details
// These functions should compare the necessary attributes to determine equality
function areTableDetailsEqual(table1, table2) {
    // Compare table details (e.g., description)
    return table1.description === table2.description;
}

function areFieldDetailsEqual(field1, field2) {
    // Compare field details (e.g., type, options)
    return field1.type === field2.type && JSON.stringify(field1.options) === JSON.stringify(field2.options);
}

// Example "master" function to orchestrate the comparison
export async function executeComparison(selectedBaseSchema: any, receivingBaseSchema: any) {
    const differences = compareBaseSchemas(selectedBaseSchema, receivingBaseSchema); // Adjust this line as per your actual comparison logic implementation
    console.log(differences);
    return differences;
}