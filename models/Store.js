const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = new mongoose.Schema({
    placeId: {
        type: String,
        required: [true, 'Please add a store ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Store ID must be less than 1- chars']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    place: {
        type: String
    },
    description: {
        type: String
    },
    marker: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        //Get more information from here
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// GEocode & create location
StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    // Do not save address
    this.address = undefined;
    next();
});

module.exports = mongoose.model('Store', StoreSchema);