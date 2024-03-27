export const StepNavigation = ({ step, isLastStep, isStepCompleted, nextStep, previousStep }) => {
    return (
        <div className="flex justify-center items-center gap-40">
            {step !== 1 && (
                <button onClick={previousStep} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                    Previous
                </button>
            )}
            {!isLastStep && (
                <button
                    onClick={nextStep}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isStepCompleted() ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                    Next
                </button>
            )}
        </div>
    );
};
