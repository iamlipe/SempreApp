import Database from "better-sqlite3";

import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

ipcMain.handle('fetch-all-proposals', async () => {
    try {
        const db = new Database(dbPath);
        const rows = db.prepare('SELECT * FROM propostas').all();
        db.close();
        console.log('Lista de propostas obtida com sucesso.');
        return rows;
      } catch (error) {
        console.error('Erro ao obter todos as propostas:', error.message);
        throw error;
      }
});