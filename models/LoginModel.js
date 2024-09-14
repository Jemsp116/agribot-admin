import { Schema, model, models } from "mongoose"

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, "Must provide a name."],
    },
    email: {
        type: String,
        required: [true, "Must provide an email."],
        unique: [true, "Must be unique."],
    },
    password: {
        type: String,
        required: [true, "Must provide a password."],
    },
},
{
    timestamps: true,
}
);

const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;