import {Operation} from 'oas';

export function getValueByPath(jsonObject: any, pathArray: (string | number)[]): any {
    let current = jsonObject;

    for (const key of pathArray) {
        if (current === undefined || current === null) {
            return undefined; // Return undefined if the path does not exist
        }
        current = current[key];
    }

    return current;
}

export function extractExampleBody(schema) {
    if (!schema) return null;

    // Check if there is a top-level example
    if (schema.example) {
        return schema.example;
    }

    // If there are examples, return the first one
    if (schema.examples) {
        const firstExampleKey = Object.keys(schema.examples)[0];
        return schema.examples[firstExampleKey]?.value || schema.examples[firstExampleKey];
    }

    // Handle objects recursively
    if (schema.type === "object" && schema.properties) {
        const example = {};
        for (const [key, property] of Object.entries(schema.properties)) {
            example[key] = extractExampleBody(property); // Recursively extract examples for each property
        }
        return example;
    }

    // Handle arrays
    if (schema.type === "array" && schema.items) {
        return [extractExampleBody(schema.items)]; // Extract example for an array item
    }

    // If no example is found, return a placeholder or null
    return schema.default || null;
}

export function getRequestBodyFromBodySchema(body: any): object {
    if (body[0] !== 'application/json') {
        return null
    }
    let schema = body[1].schema;
    return generatePayloadFromSchema(schema)
}

// Helper function to generate an object from a schema
function generatePayloadFromSchema(schema: any): any {
    if (schema.type === 'object' && schema.properties) {
        const obj: Record<string, any> = {};
        for (const [key, property] of Object.entries(schema.properties)) {
            obj[key] = generateDefaultValue(property); // Recursively generate default values
        }
        return obj;
    }

    if (schema.type === 'array' && schema.items) {
        return [generateDefaultValue(schema.items)];
    }

    return generateDefaultValue(schema); // For other types, return default value
}

// Generate default values for primitive types
function generateDefaultValue(property: any): any {
    switch (property.type) {
        case 'string':
            return property.example || 'string';
        case 'number':
            return property.example || 0;
        case 'integer':
            return property.example || 0;
        case 'boolean':
            return property.example || false;
        case 'array':
            return property.items ? [generateDefaultValue(property.items)] : [];
        case 'object':
            return property.properties ? generatePayloadFromSchema(property) : {};
        default:
            return null; // Unknown type
    }
}
