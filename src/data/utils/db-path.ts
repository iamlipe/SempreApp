import electron from 'electron';
import path from 'path';

export const dbPath = path.join(electron.app.getPath('userData'), 'mydatabase.db');
