import mongoose, { Schema, model, models } from "mongoose";

const FAQschema = new Schema({
    question: { type: String, required: false },
    answer: { type: String, required: false },
});

const FAQ_Schema = new Schema({
    headline: { type: String, required: true },
    questions: [FAQschema],
});

// Check if the model already exists before creating a new one
const FAQ = models.FAQ || model("FAQ", FAQ_Schema);

export default FAQ;