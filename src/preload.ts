import { contextBridge, ipcRenderer } from "electron";
import { Proposal } from "./data/models/proposal";

import { AuthenticationParams } from "./data/use-cases/fake-authentication";

contextBridge.exposeInMainWorld('database', {
    login: (params: AuthenticationParams) => ipcRenderer.invoke('login', params),
    saveProposal: (params: Omit<Proposal, "id">) => ipcRenderer.invoke('save-proposal', params),
    deleteProposal: (id: string) => ipcRenderer.invoke('delete-proposal', id),
    fetchAllProposal: () => ipcRenderer.invoke('fetch-all-proposals'),
    fetchProposal: (id: string) => ipcRenderer.invoke('fetch-proposal', id),
    createTableProposal: () => ipcRenderer.invoke('create-table-proposal'),
    updateProposal: (params: Proposal) => ipcRenderer.invoke('update-proposal', params)
});
