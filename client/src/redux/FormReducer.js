const initialState = {
    formData: {
        phoneNumber: '',
        photo: '',
        username: '',
        personalDetails: '',
        forDetails: '',
        propertyType: '',
        totalFlats: '',
        location: {
            lat: '',
            lng: '',
            address: '',
        },
        description: '',
        bedrooms: '',
        bathrooms: '',
        totalFloors: '',
        floorNumber: '',
        furnishedStatus: '',
        coveredArea: '',
        carpetArea: '',
        constructionYear: '',
        amenities: [],
        photos: [],
        price: '',
        advanceDeposit: '',
        priceIncludes: '',
        maintenanceCharges: '',
        excludeStampDuty: false,
        publishedStatus: false,
        propertyStatus: '',
        soldStatus: false,
        licenseCardStatus: {
            plan: '',
        },
        likes: [],
        createdAt: '',
        updatedAt: '',
        __v: 0,
    }
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PROPERTY_FORM_DATA':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default formReducer;
