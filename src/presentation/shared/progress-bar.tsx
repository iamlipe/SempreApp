interface ProgressBarProps {
    totalSteps: number;
    currentStep: number;
}

export function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full bg-orange-200 rounded-md h-6 mb-10">
            <div className="bg-orange-600 h-6 rounded-md" style={{ width: `${progress}%` }}/>
        </div>
    )
}