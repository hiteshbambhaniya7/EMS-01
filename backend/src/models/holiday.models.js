import mongoose,{Schema} from 'mongoose';

const holidaySchema = new Schema({
    holiday: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }

},{timestamps: true});

export const Holiday = mongoose.model('Holiday' , holidaySchema);