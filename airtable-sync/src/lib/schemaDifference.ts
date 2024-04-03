export async function compareSchemas(baseSchema, receivingSchema) {
    let actions = {
        createTables: [],
        updateTables: [],
        deleteTables: []
    };

    // Create maps for quick lookup by ID
    let baseTablesMap = new Map(baseSchema.map(table => [table.id, table]));
    let receivingTablesMap = new Map(receivingSchema.map(table => [table.id, table]));

    // Determine tables to be created, updated, or deleted
    baseSchema.tables.forEach(baseTable => {
        if (!receivingTablesMap.has(baseTable.id)) {
            // For tables to be created, include all its fields in the options
            actions.createTables.push({
                id: baseTable.id,
                name: baseTable.name,
                type: "table", // Assuming a type to distinguish between tables and fields
                options: {
                    fields: baseTable.fields.map(field => ({
                        id: field.id,
                        name: field.name,
                        type: field.type,
                        options: field.options || {}
                    }))
                }
            });
        } else {
            let receivingTable = receivingTablesMap.get(baseTable.id);
            let tableUpdates = compareTableFields(baseTable, receivingTable);
            if (tableUpdates.create.length > 0 || tableUpdates.update.length > 0 || tableUpdates.delete.length > 0) {
                actions.updateTables.push({
                    id: baseTable.id,
                    name: baseTable.name,
                    type: "table",
                    options: tableUpdates
                });
            }
        }
    });

    // Determine tables to delete
    receivingSchema.tables.forEach(receivingTable => {
        if (!baseTablesMap.has(receivingTable.id)) {
            actions.deleteTables.push({
                id: receivingTable.id,
                name: receivingTable.name,
                type: "table",
                options: {} // No additional options needed for deletion
            });
        }
    });

    return actions;
}

function compareTableFields(baseTable, receivingTable) {
    let fieldActions = {
        create: [],
        update: [],
        delete: []
    };

    let baseFieldsMap = new Map(baseTable.fields.map(field => [field.id, field]));
    let receivingFieldsMap = new Map(receivingTable.fields.map(field => [field.id, field]));

    baseTable.fields.forEach(baseField => {
        if (!receivingFieldsMap.has(baseField.id)) {
            fieldActions.create.push({
                id: baseField.id,
                name: baseField.name,
                type: baseField.type,
                options: baseField.options || {}
            });
        } else {
            // Example for an update check. Implement actual comparison logic as needed.
            let receivingField = receivingFieldsMap.get(baseField.id);
            if (baseField.type !== receivingField.type) { // Simplified check, expand as necessary
                fieldActions.update.push({
                    id: baseField.id,
                    name: baseField.name,
                    type: baseField.type,
                    options: baseField.options || {}
                });
            }
        }
    });

    receivingTable.fields.forEach(receivingField => {
        if (!baseFieldsMap.has(receivingField.id)) {
            fieldActions.delete.push({
                id: receivingField.id,
                name: receivingField.name,
                type: receivingField.type,
                options: receivingField.options || {}
            });
        }
    });

    return fieldActions;
}
