import { contextBridge, ipcRenderer } from "electron";

import { AuthenticationParams } from "./data/use-cases/fake-authentication";

contextBridge.exposeInMainWorld('database', {
    login: (params: AuthenticationParams) => ipcRenderer.invoke('login', params),
    saveProposal: () => ipcRenderer.invoke('save-proposal'),
    deleteProposal: () => ipcRenderer.invoke('delete-proposal'),
    fetchAllProposal: () => ipcRenderer.invoke('fetch-all-proposals'),
    fetchProposal: () => ipcRenderer.invoke('fetch-proposal'),
    createTableProposal: () => ipcRenderer.invoke('create-table-proposal'),
});
