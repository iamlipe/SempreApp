import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

import Database from "better-sqlite3";

ipcMain.handle('create-table-proposal', async () => {
    try {
        const db = new Database(dbPath);
        const sql = 'CREATE TABLE IF NOT EXISTS proposal (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, proposalNumber TEXT, customerReference TEXT, company TEXT, cnpj TEXT, requester TEXT, email TEXT, phone TEXT, invoicing TEXT, invoicingStatus TEXT, "system" TEXT, formPayment TEXT, notesPaymentCondition TEXT, deliveryTimeAndSchedule TEXT, shortTextItemFieldOne TEXT, featuresOfTheFirstBatteryBank TEXT, shortTextItemFieldTwo TEXT, featuresOfTheSecondBatteryBank TEXT, createdAt TEXT);'
        db.prepare(sql).run();
        db.close();
        console.log('Tabela de propostas criada com sucesso.');
        return { message: 'Tabela criada com sucesso.' };
      } catch (error) {
        console.error('Erro ao criar a tabela de propostas:', error.message);
        throw error;
      }
});