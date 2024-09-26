import { Schema, model, models } from "mongoose";

const QuerySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['answered', 'unanswered'],
            required: true,
        },
    },
    { timestamps: true }
);

const Query = models.Query || model("Query", QuerySchema);

export default Query;