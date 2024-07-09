interface ProgressBarProps {
    totalSteps: number;
    currentStep: number;
}

export function ProgressBar({ totalSteps, currentStep }: ProgressBarProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full bg-orange-200 rounded-md h-6 mb-10">
            <div
                className="bg-orange-500 h-6 rounded-md transition-all duration-500"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
