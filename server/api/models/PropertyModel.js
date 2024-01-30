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
    }
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;


propertySchema.index({ '$**': 'text' });