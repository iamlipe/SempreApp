import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

import Database from "better-sqlite3";

ipcMain.handle('save-proposal', async (event, proposalData) => {
    try {
        const db = new Database(dbPath);
        const sql = `INSERT INTO proposal (
            proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, 
            invoicingStatus, "system", formPayment, notesPaymentCondition, deliveryTimeAndSchedule, 
            shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, 
            featuresOfTheSecondBatteryBank, createdAt
        ) VALUES (
            @proposalNumber, @customerReference, @company, @cnpj, @requester, @email, @phone, @invoicing, 
            @invoicingStatus, @system, @formPayment, @notesPaymentCondition, @deliveryTimeAndSchedule, 
            @shortTextItemFieldOne, @featuresOfTheFirstBatteryBank, @shortTextItemFieldTwo, 
            @featuresOfTheSecondBatteryBank, @createdAt
        );`;

        const stmt = db.prepare(sql);
        stmt.run(proposalData);
        db.close();
        console.log('Proposta salva com sucesso.');
        return { success: true, message: 'Proposta salva com sucesso.' };
    } catch (error) {
        console.error('Erro ao salvar a proposta:', error.message);
        throw error;
    }
});