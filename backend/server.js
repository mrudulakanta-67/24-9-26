const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to memoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  marks: Number,
  grade: String
});

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  branch: String,
  year: String,
  semester: String,
  academicYear: String,
  image: String,
  subjects: [subjectSchema],
  totalMarks: Number,
  percentage: Number,
  cgpa: Number
});

const Student = mongoose.model("memo", studentSchema);

app.get("/api/student", async (req, res) => {
  try {
    const { id, year, semester } = req.query;

    const student = await Student.findOne({
      id: id,
      year: year,
      semester: semester
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Student Mark List Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});