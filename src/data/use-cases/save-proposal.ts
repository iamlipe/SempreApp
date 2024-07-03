import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

import Database from "better-sqlite3";

export interface SavaProposalParams {
    proposalNumber: string;
    customerReference: string;
    company: string;
    cnpj: string;
    requester: string;
    email: string;
    phone: string;
    invoicing: string;
    invoicingStatus: string;
    system: string;
    formPayment: string;
    notesPaymentCondition: string
    deliveryTimeAndSchedule: string;
    shortTextItemFieldOne: string;
    featuresOfTheFirstBatteryBank: string;
    shortTextItemFieldTwo: string;
    featuresOfTheSecondBatteryBank: string;
    createdAt: string;
}

ipcMain.handle('save-proposal', async (_, proposalData: SavaProposalParams) => {
    try {
        const db = new Database(dbPath);
        const { proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, 
            invoicingStatus, system, formPayment, notesPaymentCondition, deliveryTimeAndSchedule, 
            shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, 
            featuresOfTheSecondBatteryBank, createdAt
        } = proposalData

        const sql = `INSERT INTO proposal (proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, invoicingStatus, system, formPayment, notesPaymentCondition, deliveryTimeAndSchedule, shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, featuresOfTheSecondBatteryBank, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const stmt = db.prepare(sql); 
        stmt.run(proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, 
            invoicingStatus, system, formPayment, notesPaymentCondition, deliveryTimeAndSchedule, 
            shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, 
            featuresOfTheSecondBatteryBank, createdAt
        );

        db.close();
        console.log('Proposta salva com sucesso.');
        return { success: true, message: 'Proposta salva com sucesso.' };
    } catch (error) {
        console.error('Erro ao salvar a proposta:', error.message);
        throw error;
    }
});