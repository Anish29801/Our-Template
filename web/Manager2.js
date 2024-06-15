import fs from 'fs/promises';
import shopify from "./shopify.js";
import PrivacyWebhookHandlers from "./privacy.js";

async function readSessionFile(sessionFile) {
    try {
        const data = await fs.readFile(sessionFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading or parsing JSON file: ${error}`);
    }
}

async function printSessionData(payload, sessionData) {
    console.log(`Type ------------------------->${typeof (sessionData)}`);
    console.log(`----------------------------------------------------------------`);
    console.log(`id -------------------------------> ${payload.id}`);
    console.log(`----------------------------------------------------------------`);
    console.log('JSON data:');
    console.log(sessionData);
    console.log('Parsed JavaScript object:');
    console.log(sessionData);
    try {
        console.log("Payload ---------------------------------------> " + payload);
        // Session is built by the OAuth process

        const res = await shopify.api.rest.InventoryLevel.all({
            session: sessionData,
            location_ids: payload.location_id,
        });

        console.log(`--------------------------------------------------------------------------------------------------------------------------------`);
        console.log(res);
        console.log(`--------------------------------------------------------------------------------------------------------------------------------`);

    } catch (error) {
        console.log(error);
    }
}

async function Manager2(payload) {
    const sessionFile = "./session.json";
    try {
        const sessionData = await readSessionFile(sessionFile);
        printSessionData(payload, sessionData);
    } catch (error) {
        console.error('Error:', error);
    }
}


export default Manager2;
