import { schema } from "mongoose";
const UserSchema = new schema({
    firstName : String,
    lastName : String,
    age : Number,
    dateOfEntry :  {
        type: Date,
        default: new Date()
    },
    lastDate: {
        type: Date,
        default: new Date()
    }
});
export default UserSchema;