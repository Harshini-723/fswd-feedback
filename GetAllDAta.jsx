
import { useEffect, useState } from "react";
import axios from "axios";

function GetAllDAta() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getfeedback")
      .then((response) => setFeedbacks(response.data))
      .catch(() => setError("Unable to load feedback."));
  }, []);

  return (
    <div className="container">
      <h2>Feedback List</h2>

      {error && <p>{error}</p>}

      {feedbacks.map((item) => (
        <div key={item._id}>
          <p><strong>Name:</strong> {item.q1}</p>
          <p><strong>Department:</strong> {item.q2}</p>
          <p><strong>Session:</strong> {item.q3}</p>
          <p><strong>Feedback:</strong> {item.q4}</p>
          <p><strong>Suggestions:</strong> {item.q5}</p>
          <p>
            <strong>Submitted At:</strong>{" "}
            {item.submittedAt
              ? new Date(item.submittedAt).toLocaleString()
              : "Not available"}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default GetAllDAta;
