import Database from "better-sqlite3";

import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

ipcMain.handle('fetch-proposal', async (_, id) => {
    try {
        const db = new Database(dbPath);
        const row = db.prepare('SELECT * FROM propostas WHERE id = ?').get(id);
        db.close();

        if (row) {
            console.log(`Proposta com ID ${id} obtida com sucesso.`);
            return row;
        } else {
            console.warn(`Nenhuma proposta encontrada com o ID ${id}.`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao obter a proposta com ID ${id}:`, error.message);
        throw error;
    }
});