// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

import { AuthenticationParams } from "./data/use-cases/fake-authentication";

contextBridge.exposeInMainWorld('database', {
    login: (params: AuthenticationParams) => ipcRenderer.invoke('login', params),
    addProposal: () => ipcRenderer.invoke('add-proposal'),
    deleteProposal: () => ipcRenderer.invoke('delete-proposal'),
    getAllProposal: () => ipcRenderer.invoke('get-all-proposal'),
    getProposal: () => ipcRenderer.invoke('get-proposal'),
    createTableProposal: () => ipcRenderer.invoke('create-table-proposal'),
});
