import { ipcMain } from "electron";
import { dbPath } from "../utils/db-path";

import Database from "better-sqlite3";

const deleteSql = `DELETE FROM propostas WHERE id = ?;`;

ipcMain.handle('delete-proposal', async (_, id) => {
    try {
        const db = new Database(dbPath);
        const stmt = db.prepare(deleteSql);
        stmt.run(id);
        db.close();
        console.log('Proposta deletada com sucesso.');
        return { success: true, message: 'Proposta deletada com sucesso.' };
    } catch (error) {
        console.error('Erro ao deletar a proposta:', error.message);
        throw error;
    }
});