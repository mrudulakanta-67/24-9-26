import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const searchStudent = async () => {
    try {
      setError("");
      setStudent(null);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student`,
        {
          params: {
            id: studentId,
            year: year,
            semester: semester,
          },
        }
      );

      setStudent(response.data);
    } catch (err) {
      setError("Student record not found.");
    }
  };

  return (
    <div className="container">
      <h1>Student Mark List</h1>

      {!student && (
        <div className="search-box">
          <label>Student ID</label>
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          <label>Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <label>Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>

          <button onClick={searchStudent}>Search</button>

          {error && <p className="error">{error}</p>}
        </div>
      )}

      {student && (
        <div className="memo">
          <div className="memo-header">
            <div>
              <h2>STUDENT MEMORANDUM OF MARKS</h2>
              <p>Academic Year: {student.academicYear}</p>
            </div>

            <img
              src={student.image}
              alt="Student"
              className="student-image"
            />
          </div>

          <div className="student-details">
            <p>
              <strong>Name:</strong> {student.name}
            </p>

            <p>
              <strong>ID:</strong> {student.id}
            </p>

            <p>
              <strong>Branch:</strong> {student.branch}
            </p>

            <p>
              <strong>Year:</strong> {student.year}
            </p>

            <p>
              <strong>Semester:</strong> {student.semester}
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject</th>
                <th>Subject Code</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {student.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subject.name}</td>
                  <td>{subject.code}</td>
                  <td>{subject.marks}</td>
                  <td>{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="result">
            <p>
              <strong>Total Marks:</strong> {student.totalMarks}
            </p>

            <p>
              <strong>Percentage:</strong> {student.percentage}%
            </p>

            <p>
              <strong>CGPA:</strong> {student.cgpa}
            </p>
          </div>

          <button
            className="back-button"
            onClick={() => {
              setStudent(null);
              setStudentId("");
              setYear("");
              setSemester("");
            }}
          >
            Search Another Student
          </button>
        </div>
      )}
    </div>
  );
}

export default App;