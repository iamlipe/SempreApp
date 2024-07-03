import { Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { useProposal } from "../../contexts/proposal";
import { ProgressBar } from "../../shared/progress-bar";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../shared/button";
import { db } from "../../utils/database-client";


export function ProposalRoot() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [step, setStep] = useState(0)

    const { handleId, handleData } = useProposal()

    const params: any = {};

    for(const entry of searchParams.entries()) {
      params[`${entry[0]}`] = entry[1]
    }

    const handleProposal = async (value: string) => {
        try {
            const resp = await db.fetchProposal(value)
            handleData(resp)
            navigate('/proposal/person-data')
        } catch (error) {
            alert(error)   
        }
    }

    const goBack = () => {
        if (location.pathname.includes('person-data')) {
            navigate('/home')
        } else {
            navigate(-1)
        }
    }
   
    useEffect(() => {
        if (params.id) {
            setTitle('Editar Proposta')
            handleId(Number(params.id))
            handleProposal(params.id)
        } else {
            setTitle('Cadastrar Proposta')
            navigate('/proposal/person-data')
        }
    }, [])

    useEffect(() => {
        if (location.pathname.includes('person-data')) {
            setSubtitle('Dados Pessoais')
            setStep(1);
        }

        if (location.pathname.includes('payment')) {
            setSubtitle('Pagamento')
            setStep(2);
        }

        if (location.pathname.includes('specifications')) {
            setSubtitle('Especificações')
            setStep(3);
        }
    }, [location.pathname]);

    return (
        <>
            <Button variant="ghost" className="absolute top-12 left-8 text-xs uppercase font-medium text-orange-500 flex items-center space-x-2" onClick={goBack}>
                <ArrowLeft size={14} />
                <span>voltar</span>
            </Button>

            <div className="flex flex-col justify-center items-center py-12 px-4">
                <div className="flex flex-col space-y-2 w-1/2">
                    <div className="flex flex-col space-y-4 mb-6">
                        <div className="flex flex-col space-y-1">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <h3 className="text-sm font-medium text-slate-600">{subtitle}</h3>
                        </div>
                        <ProgressBar totalSteps={3} currentStep={step} />
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </>
    )
}