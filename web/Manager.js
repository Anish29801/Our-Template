import fs from 'fs/promises';
import queryRunner2 from "./query2.js"

async function readSessionFile(sessionFile) {
    try {
        const data = await fs.readFile(sessionFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error reading or parsing JSON file: ${error}`);
    }
}

function printSessionData(payload, sessionData) {
    console.log(`Type ------------------------->${typeof (sessionData)}`);
    console.log(`----------------------------------------------------------------`);
    console.log(`id -------------------------------> ${payload.id}`);
    console.log(`----------------------------------------------------------------`);
    console.log('JSON data:');
    console.log(sessionData);
    console.log('Parsed JavaScript object:');
    console.log(sessionData);
    try {
        queryRunner2(sessionData, payload)
    } catch (error) {
        console.log(error);
    }
}

async function Manager(payload) {
    const sessionFile = "./session.json";
    try {
        const sessionData = await readSessionFile(sessionFile);
        printSessionData(payload, sessionData);
    } catch (error) {
        console.error('Error:', error);
    }
}


export default Manager;
