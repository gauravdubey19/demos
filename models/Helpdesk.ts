
import mongoose, { Schema, model, models } from 'mongoose';

const HelpdeskSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  issueType: {
    type: String,
    required: true,
    enum: ['Order Issue', 'Payment Issue', 'Product Issue', 'Technical Issue', 'General Inquiry'], // Adjusted as per the options
  },
  subIssueType: {
    type: String, // Can contain order number, product number, or other relevant info
  },
  description: {
    type: String,
    required: true,
  },
  attachments: {
    type: [String], // Array of file URLs
  },
  status: {
    type: String,
    default: 'open', // Could be Open, Closed
    enum: ['open', 'closed'],
  },
  response: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Helpdesk || model('Helpdesk', HelpdeskSchema);
