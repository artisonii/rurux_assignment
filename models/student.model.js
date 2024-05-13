const { default: mongoose } = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  student_id: { type: mongoose.SchemaTypes.ObjectId },
  year: {
    type: String,
    enum: ["First Year", "Second Year", "Third Year", "Fourth Year"],
  },
  stream: {
    type: String,
    enum: ["Science", "Commerce", "Arts"],
  },
  subjects: [
    {
      name: String,
      score: Number,
    },
  ],
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = { StudentModel };
