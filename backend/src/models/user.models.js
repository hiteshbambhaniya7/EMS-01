import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
    address : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    access:{
        type: String,
        enum :['GUEST','EMPLOYEE','ADMIN','SUPERADMIN'],
        default: 'GUEST'
    },
    gender:{
        type: String,
        enum :['MALE','FEMALE'],
        default: 'MALE'
    },
    marital_status:{
        type: String,
        enum :['SINGLE','MARRIED'],
        default: 'SINGLE'
    },
    joining_date:{
        type: Date
    },
    skill:{
        type: String
    },
    role:{
        type: String,
        enum :['TRAINEE','DEVELOPER','MANAGER','TEAM LEADER','DEPARTMENT HEAD'],
        default: 'ADMIN'
    },
    working_hours : {
        type: Number,
        default: 8
    }

},{timestamps: true});

export const User = mongoose.model('User' , userSchema);