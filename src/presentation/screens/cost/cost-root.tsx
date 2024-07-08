import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import { useProposal } from "../../contexts/proposal";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../shared/button";
import { ProgressBar } from "../../shared/progress-bar";
import { db } from "../../utils/database-client";

export function CostRoot() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();
    const [step, setStep] = useState(0)

    const { handleId, handleData } = useProposal()

    const params: any = {};

    for(const entry of searchParams.entries()) {
      params[`${entry[0]}`] = entry[1]
    }

    const goBack = () => {
        if (location.pathname.includes('first')) {
            navigate('/home')
        } else {
            navigate(-1)
        }
    }

    const handleProposal = async (value: string) => {
        try {
            const resp = await db.fetchProposal(value)
            handleData(resp)
            navigate('/cost/first')
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (params.id) {
            handleId(Number(params.id))
            handleProposal(params.id)
        }
    }, [])

    useEffect(() => {
        const steps = [
            'first', 'second', 'third', 'fourth', 'fifth', 
            'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 
            'eleventh', 'twelfth', 'thirteenth'
        ];
    
        const stepIndex = steps.findIndex(step => location.pathname.includes(step));

        if (stepIndex !== -1) {
            setStep(stepIndex + 1);
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
                            <h2 className="text-2xl font-bold">Editar Custo</h2>
                        </div>

                        <ProgressBar totalSteps={13} currentStep={step} />
                    </div>
                    
                    <Outlet />
                </div>
            </div>
        </>
    )
}