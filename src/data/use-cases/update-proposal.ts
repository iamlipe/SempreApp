import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

import Database from "better-sqlite3";

export interface UpdateProposalParams {
    id: number;
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
    notesPaymentCondition: string;
    deliveryTimeAndSchedule: string;
    shortTextItemFieldOne: string;
    featuresOfTheFirstBatteryBank: string;
    shortTextItemFieldTwo: string;
    featuresOfTheSecondBatteryBank: string;
    createdAt: string;
}

ipcMain.handle('update-proposal', async (_, proposalData: UpdateProposalParams) => {
    try {
        const db = new Database(dbPath);
        const { id, proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, 
            invoicingStatus, system, formPayment, notesPaymentCondition, deliveryTimeAndSchedule, 
            shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, 
            featuresOfTheSecondBatteryBank, createdAt
        } = proposalData

        const sql = `UPDATE proposal SET proposalNumber = ?, customerReference = ?, company = ?, cnpj = ?, requester = ?, email = ?, phone = ?, invoicing = ?, invoicingStatus = ?, system = ?, formPayment = ?, notesPaymentCondition = ?, deliveryTimeAndSchedule = ?, shortTextItemFieldOne = ?, featuresOfTheFirstBatteryBank = ?, shortTextItemFieldTwo = ?, featuresOfTheSecondBatteryBank = ?, createdAt = ? WHERE id = ?;`;
        const stmt = db.prepare(sql); 
        stmt.run(proposalNumber, customerReference, company, cnpj, requester, email, phone, invoicing, 
            invoicingStatus, system, formPayment, notesPaymentCondition, deliveryTimeAndSchedule, 
            shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, 
            featuresOfTheSecondBatteryBank, createdAt, id
        );

        db.close();
        console.log('Proposta atualizada com sucesso.');
        return { success: true, message: 'Proposta atualizada com sucesso.' };
    } catch (error) {
        console.error('Erro ao atualizar a proposta:', error.message);
        throw error;
    }
});
