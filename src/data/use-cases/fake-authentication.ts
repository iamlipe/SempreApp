import { ipcMain } from "electron";

export interface AuthenticationParams {
    username: string;
    password: string;
}

ipcMain.handle('login', async (_, params: AuthenticationParams) => {
    const fakeAccounts = [
        {
            "username": "felipe",
            "password": "1234"
        },
        {
            "username": "vinicius",
            "password": "1234"
        }
    ]

    for (let i = 0; i < fakeAccounts.length; i++) {
        const account = fakeAccounts[i];

        if (account.username === params.username && account.password === params.password) {
            return { success: true, message: `Usuário '${account.username}' autenticado com sucesso.` };
        } else {
            return { success: false, message: 'Senha incorreta.' };
        }
    }
});