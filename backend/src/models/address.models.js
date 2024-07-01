import mongoose,{Schema} from 'mongoose';

const addressSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }

},{timestamps: true});

export const Address = mongoose.model('Address' , addressSchema);