import mongoose,{Schema} from 'mongoose';

const leaveSchema = new Schema({
    leaveType: {
        type: String,
        required: true
    },
    fromDate: {
        type: Date,
        required: true
    },
    toDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

},{timestamps: true});

export const Leave = mongoose.model('Leave' , leaveSchema);