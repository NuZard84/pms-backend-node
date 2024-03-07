const mongoose = require("mongoose");
const Doctor = require("./doctorModal");
const Patient = require("./patientModal");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: { type: String, required: true, enum: ["Doctor", "Patient"] },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    seenAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "participants.participantModel",
          required: true,
        },
        participantModel: {
          type: String,
          enum: ["Doctor", "Patient"],
          required: true,
        },
      },
    ],
    messages: [messageSchema],
    typingIndicator: { type: Boolean, default: false },
    lastMessageAt: { type: Date },
    lastSeenAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
