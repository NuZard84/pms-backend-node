require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const authRoutes = require("./routes/auth");
const passport = require("./config/passport");
const flash = require("connect-flash");
const detailRoutes = require("./routes/details");
const consultDocRoutes = require("./routes/consult");
const fetchPatientsRouter = require("./routes/fetchPatients");
const secKeyRoutes = require("./routes/secKey");
const queryRoutes = require("./routes/query");
const { Server } = require("socket.io");
const http = require("http");
const Doctor = require("./models/doctorModal");
const Patient = require("./models/patientModal");
const Conversation = require("./models/conversationModal");

const server = http.createServer(app);
// const dc = require("./models/doctorModal");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  // Join the conversation room
  socket.on("join-conversation", async ({ doctorId, patientId }) => {
    try {
      const doctor = await Doctor.findById(doctorId);
      const patient = await Patient.findById(patientId);

      if (!doctor || !patient) {
        console.error("Doctor or patient not found");
        return;
      }

      let conversation = await Conversation.findOne({
        participants: {
          $all: [doctorId, "Doctor", patientId, "Patient"],
        },
      });

      if (!conversation) {
        // Create a new conversation if it doesn't exist
        conversation = new Conversation({
          participants: [doctorId, "Doctor", patientId, "Patient"],
          messages: [],
        });
        await conversation.save();
      }

      socket.join(`conversation-${doctorId}-${patientId}`);
      console.log(`User joined conversation room: ${doctorId}-${patientId}`);

      // Fetch and send conversation history
      const messages = conversation.messages;
      socket.emit("conversation-history", messages);
    } catch (err) {
      console.error(err);
    }
  });

  // Handle new message
  socket.on(
    "new-message",
    async ({ doctorId, patientId, content, senderId, senderModel }) => {
      try {
        const conversation = await Conversation.findOne({
          participants: {
            $all: [doctorId, "Doctor", patientId, "Patient"],
          },
        });

        if (conversation) {
          const newMessage = {
            sender: senderId,
            senderModel,
            content,
            timestamp: new Date(),
            read: false,
          };

          conversation.messages.push(newMessage);
          conversation.lastMessageAt = new Date();
          await conversation.save();

          io.to(`conversation-${doctorId}-${patientId}`).emit(
            "receive-message",
            newMessage
          );
        } else {
          console.error("Conversation not found");
        }
      } catch (err) {
        console.error(err);
      }
    }
  );

  // Handle message read
  socket.on("message-read", async ({ doctorId, patientId, messageId }) => {
    try {
      const conversation = await Conversation.findOne({
        participants: {
          $all: [doctorId, "Doctor", patientId, "Patient"],
        },
      });

      if (conversation) {
        const message = conversation.messages.id(messageId);
        if (message) {
          message.read = true;
          message.seenAt = new Date();
          await conversation.save();
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Handle typing indication
  socket.on("typing", async ({ doctorId, patientId, isTyping }) => {
    try {
      const conversation = await Conversation.findOne({
        participants: {
          $all: [doctorId, "Doctor", patientId, "Patient"],
        },
      });

      if (conversation) {
        conversation.typingIndicator = isTyping;
        await conversation.save();

        io.to(`conversation-${doctorId}-${patientId}`).emit(
          "typing-indication",
          isTyping
        );
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });
});
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes handler
app.use("/auth", authRoutes);
app.use("/details", detailRoutes);
app.use("/consult", consultDocRoutes);
app.use("/fetchpatients", fetchPatientsRouter);
app.use("/seckey", secKeyRoutes);
app.use("/query", queryRoutes);
app.use("/getpatient", require("./routes/getPatient"));
app.use("/admin", require("./routes/admin"));
app.use("/getdoctor", require("./routes/getDoctor"));
app.use("/chatgpt", require("./routes/chatGpt"));
// app.use("/reports", require("./routes/reports"));
app.use("/verifykey", require("./routes/verifyKey"));
app.use("/fetchall", require("./routes/fetchAll"));

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to database !");
  })
  .catch((err) => {
    console.log("Connection failed !\n", err);
  });

// starting server on PORT
app.get("/", (req, res) => {
  // console.log("enter to /");
  // const dct = new dc({
  //   email: "doctor2@gmail.com",
  //   password: "$2a$10$VFu5xsh5YP2TmOXebRHu0OmSGYVhbCV98lRlYZkYyOvtk2t.6cr02",
  //   isDoctor: true,
  // });
  // await dct.save();
  res.send("Hello World !");
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("Server is live on PORT :", PORT);
  console.log("http://localhost:8080");
});
