import mongoose, {Schema} from 'mongoose';

const projectSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    manager:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum :['SUBMIT','DELIVERED','INPROGRESS'],
        default: 'INPROGRESS'
    },
    projectCost:{
        type: Number,
        required: true
    },
    payment:{
        type:String,
        enum :['PAID','UNPAID'],
        default: 'UNPAID'
    },
    team:[{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]

},{timestamps: true});

export const Project = mongoose.model('Project' , projectSchema);