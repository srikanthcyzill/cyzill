import React, { useEffect, useReducer } from 'react';
import Description from './steps/Description';
import Media from './steps/Media';
import Location from './steps/Location';
import Details from './steps/Details';
import Payment from './steps/Payment';
import { StepList } from './StepList';
import { StepNavigation } from './StepNavigation';

const initialState = {
    step: 1,
    formData: {
        description: '',
        media: [],
        location: '',
        detail: '',
        payment: [],
    },
    completedSteps: {},
};

function reducer(state, action) {
    switch (action.type) {
        case 'nextStep':
            return {
                ...state,
                step: state.step + 1,
                completedSteps: {
                    ...state.completedSteps,
                    [state.step]: true,
                },
            };
        case 'previousStep':
            return { ...state, step: state.step - 1 };
        case 'saveFormData':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.data,
                    location: {
                        ...state.formData.location,
                        ...action.data.location,
                    },
                },
            };
        case 'setStep':
            if (state.completedSteps[action.newStep] || action.newStep === state.step + 1) {
                return { ...state, step: action.newStep };
            }
            return state;
        default:
            return state;
    }
}

const steps = {
    1: { component: Description, name: 'Description' },
    2: { component: Media, name: 'Media' },
    3: { component: Location, name: 'Location' },
    4: { component: Details, name: 'Details' },
    5: { component: Payment, name: 'Payment' },
};

const PropertyListing = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const setStep = (newStep) => dispatch({ type: 'setStep', newStep });
    const { step, formData } = state;
    const nextStep = () => {
        if (isStepCompleted()) {
            const nextStepNumber = step + 1;
            if (nextStepNumber <= Object.keys(steps).length) {
                dispatch({ type: 'nextStep' });
            }
        } else {
            console.error('Please complete the current step before moving to the next step.');
        }
    };

    const previousStep = () => dispatch({ type: 'previousStep' });

    const saveFormData = (data) => {
        dispatch({ type: 'saveFormData', data });
        console.log(formData);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const stepInfo = steps[step];

    if (!stepInfo) {
        return <div>Error: Step information is missing.</div>;
    }
    const { component: StepComponent } = stepInfo;

    const isStepCompleted = () => {
        switch (state.step) {
            case 1:
                return (
                    state.formData.description.trim() !== '' &&
                    state.formData.personalDetails.trim() !== '' &&
                    state.formData.forDetails.trim() !== '' &&
                    state.formData.propertyType.trim() !== '' &&
                    (state.formData.propertyType !== 'flat' || state.formData.totalFlats.trim() !== '')
                );


            case 2:
                return state.formData.media && state.formData.media.length > 0;
            case 3:
                return state.formData.location.lat !== '' && state.formData.location.lng !== '';
            case 4:
                return state.formData.bedrooms && state.formData.bathrooms && state.formData.coveredArea &&
                    state.formData.carpetArea && state.formData.constructionYear;
            case 5:
                return state.formData.payment && state.formData.payment.length > 0;
            default:
                return true;
        }
    };

    const isLastStep = step === Object.keys(steps).length;

    return (
        <div className="p-4 relative">
            <div className="steps">
                <StepList steps={steps} step={step} setStep={setStep} />
                <div />
            </div>
            <StepComponent formData={formData} setFormData={saveFormData} saveFormData={saveFormData} />
            <StepNavigation step={step} isLastStep={isLastStep} isStepCompleted={isStepCompleted} nextStep={nextStep} previousStep={previousStep} />
        </div>
    );
};

export default PropertyListing;
