import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({

},{timestamps: true});

export const Department = mongoose.model('Department' , departmentSchema);