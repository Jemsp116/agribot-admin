import { Schema, model, models } from "mongoose"

const RobotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    robotImages: {
        type: [String],  // Assuming it's an array of image URLs
        default: []
    },
    price: {
        type: Number,
        required: true  // Price is now required
    },
    features: {
        type: [String],  // Assuming features are stored as an array of strings
        default: []
    },
    type: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
);

const Robot = models.Robot || model('Robot', RobotSchema);

export default Robot;
