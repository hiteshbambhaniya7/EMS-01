import mongoose,{Schema} from 'mongoose';

const departmentSchema = new Schema({

},{timestamps: true});

export const Department = mongoose.model('Department' , departmentSchema);