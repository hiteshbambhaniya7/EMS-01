import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    client_name:{
        type: String,
        required: true
    },
    manager:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum :['SUBMIT','DELIVERED','INPROGRESS'],
        default: 'INPROGRESS'
    },
    project_cost:{
        type: Number,
        required: true
    },
    payment:{
        type:String,
        enum :['PAID','UNPAID'],
        default: 'UNPAID'
    }

},{timestamps: true});

export const Project = mongoose.model('Project' , projectSchema);