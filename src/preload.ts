import { contextBridge, ipcRenderer } from "electron";

import { AuthenticationParams } from "./data/use-cases/fake-authentication";
import { SavaProposalParams } from "./data/use-cases/save-proposal";
import { UpdateProposalParams } from "./data/use-cases/update-proposal";

contextBridge.exposeInMainWorld('database', {
    login: (params: AuthenticationParams) => ipcRenderer.invoke('login', params),
    saveProposal: (params: SavaProposalParams) => ipcRenderer.invoke('save-proposal', params),
    deleteProposal: () => ipcRenderer.invoke('delete-proposal'),
    fetchAllProposal: () => ipcRenderer.invoke('fetch-all-proposals'),
    fetchProposal: (id: string) => ipcRenderer.invoke('fetch-proposal', id),
    createTableProposal: () => ipcRenderer.invoke('create-table-proposal'),
    updateProposal: (params: UpdateProposalParams) => ipcRenderer.invoke('update-proposal', params)
});
