import { Outlet, useLocation, useNavigate} from "react-router-dom";
import { ProposalProvider } from "../../contexts/proposal";
import { ProgressBar } from "../../shared/progress-bar";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../shared/button";

export function ProposalRoot() {
    const [subtitle, setSubtitle] = useState('')
    const [step, setStep] = useState(0)

    const navigate = useNavigate();
    const location = useLocation();

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
        <ProposalProvider>
            <Button variant="ghost" className="absolute top-12 left-8 text-xs uppercase font-medium text-orange-500 flex items-center space-x-2" onClick={() => navigate(-1)}>
                <ArrowLeft size={14} />
                <span>voltar</span>
            </Button>

            <div className="flex flex-col justify-center items-center py-12 px-4">
                <div className="flex flex-col space-y-2 w-1/2">
                    <div className="flex flex-col space-y-4 mb-6">
                        <div className="flex flex-col space-y-1">
                            <h2 className="text-2xl font-bold">Cadastrar Proposta</h2>
                            <h3 className="text-sm font-medium text-slate-600">{subtitle}</h3>
                        </div>
                        <ProgressBar totalSteps={3} currentStep={step} />
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </ProposalProvider>
    )
}