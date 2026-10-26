
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const handleChange = (e) => {
    setFeedback({
      ...feedback,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        feedback
      );

      alert("Feedback submitted successfully!");

      setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
      });
    } catch (error) {
      alert("Submission failed. Check the backend server.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Online Survey Application</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="q1" value={feedback.q1}
          onChange={handleChange} required />

        <label>Department:</label>
        <input name="q2" value={feedback.q2}
          onChange={handleChange} required />

        <label>Session title:</label>
        <input name="q3" value={feedback.q3}
          onChange={handleChange} required />

        <label>Feedback:</label>
        <textarea name="q4" value={feedback.q4}
          onChange={handleChange} required />

        <label>Suggestions:</label>
        <textarea name="q5" value={feedback.q5}
          onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
