import { db } from "../utils/database-client";
import { useEffect, useState } from "react";
import { ItemList } from "../shared/item-list";
import { Proposal } from "../../data/models/proposal";
import { Button } from "../shared/button";
import { FileText, FolderPen, LogOut, Plus, Trash, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()

    const [proposals, setProposals] = useState<Proposal[]>([])

    const handleFetchAllProposal = async () => {
        try {
            const resp = await db.fetchAllProposal()
            setProposals(resp.sort((a: Proposal, b: Proposal) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } catch (error) {
            alert(error)   
        }
    }

    useEffect(() => {
        handleFetchAllProposal()
    }, [])

    return (
        <div className="flex flex-col py-12 px-8">
            <div className="flex justify-between items-center">
                <img src={'../../../public/assets/logo.png'} alt="logo" width={180} height={60} />
                <Button variant="ghost" onClick={() => navigate('/')}>
                    <LogOut className="mr-3" />
                    Sair
                </Button>
            </div>

            <div className="flex justify-between items-end pb-10 pt-4">
                <div className="flex flex-col space-y-2">
                    <h2 className="text-4xl font-bold text-slate-800" >Lista de Propostas</h2>
                    <h2 className="text-sm font-semibold text-slate-600" >Veja todas as propostas em andamento e as próximas etapas de cada uma abaixo.</h2>
                </div>

                <Button onClick={() => navigate('/proposal')}><Plus className="mr-4"/>Cadastrar Proposta</Button>
            </div>

            <div>
                {proposals.map((p) => (
                        <ItemList 
                            key={p.id}
                            title={`${p.proposalNumber} - ${p.customerReference}`} 
                            description={p.createdAt} 
                            options={[
                                {
                                    text: 'Editar Custo',
                                    icon: <Wrench size={20} />,
                                    onPress: () => navigate(`/cost?id=${p.id}`)
                                },
                                {
                                    text: 'Editar Proposta',
                                    icon: <FolderPen size={20} />,
                                    onPress: () => navigate(`/proposal?id=${p.id}`)
                                },
                                {
                                    text: 'Visualizar PDF',
                                    icon: <FileText size={20} />,
                                    onPress: () => navigate('/document')
                                },
                                {
                                    text: 'Excluir',
                                    icon: <Trash size={20} />,
                                    onPress: () => console.log('Excluir')
                                }
                            ]}
                        />
                    ) 
                )}
            </div>



            {/* <Link to={'/cost/1/cost-basic-characteristics'} >Edit Cost Proposal</Link> */}
            {/* <Link to={'/'} >Go To Login</Link>
            <Link to={'/document'} >Go To Document</Link> */}
        </div>
    )
}