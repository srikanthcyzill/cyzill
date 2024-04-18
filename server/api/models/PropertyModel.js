import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    photo: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },
    personalDetails: {
        type: String,
        required: true
    },
    forDetails: {
        type: String,
    },
    propertyType: {
        type: String,
    },
    flatsInSociety: {
        type: String,
    },
    totalFlats: {
        type: String,
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    description: {
        type: String
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    totalFloors: {
        type: Number
    },
    floorNumber: {
        type: Number
    },
    furnishedStatus: {
        type: String,
    },
    coveredArea: {
        type: Number
    },
    carpetArea: {
        type: Number
    },
    constructionYear: {
        type: Number
    },
    amenities: {
        type: [String],
    },
    photos: [{
        type: String
    }],
    price: {
        type: Number,
        required: true
    },
    advanceDeposit: {
        type: Number,
        required: true
    },
    priceIncludes: {
        type: String,
        required: true
    },
    maintenanceCharges: {
        type: Number,
        required: true
    },
    excludeStampDuty: {
        type: Boolean,
        default: false
    },
    publishedStatus: {
        type: Boolean,
        default: false
    },
    soldStatus: {
        type: Boolean,
        default: false,
    },
    propertyStatus: {
        paymentDate: { type: Date },
        plan: { type: String, enum: ['none', 'bronze', 'silver', 'gold', 'platinum'], default: 'none' }
    },
    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            likedAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

propertySchema.methods.checkPlanExpiration = function () {
    const planDuration = plans.find(plan => plan.name === this.licenseCardStatus.plan).days;
    const expirationDate = new Date(this.licenseCardStatus.paymentDate.getTime() + planDuration * 24 * 60 * 60 * 1000);

    if (new Date() > expirationDate) {
        this.licenseCardStatus.plan = 'none';
    }
};

const Property = mongoose.model('Property', propertySchema);

export default Property;


propertySchema.index({ '$**': 'text' });