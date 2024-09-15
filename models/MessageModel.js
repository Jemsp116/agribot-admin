import mongoose, { Schema, model, models } from "mongoose"

const MessageSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Must provide a name."],
    },
    lastName: {
        type: String,
        required: [true, "Must provide a name."],
    },
    email: {
        type: String,
        required: [true, "Must provide an email."],
    },
    message: {
        type: String,
        required: [true, "Must provide a password."],
    }
},
{
    timestamps: true,
}
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;