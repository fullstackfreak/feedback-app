import React, { useEffect, useState } from "react";
import axios from "axios";

const EditFeedback = ({ but, setGo }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  const [delteMessage, setDeleteMessage] = useState(false);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("/api/feedback/all");
      setFeedbackList(res.data);
      setDeleteMessage(false);
      setGo(false);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [delteMessage, but]);

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditMessage(item.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  };
  const deleteFeedback = async (id) => {
    try {
      const resp = await axios.delete(`/api/feedback/delete/${id}`);

      if (resp.data.success == true) {
        console.log("Feedback Removed Successfully");
        setDeleteMessage(true);
      } else {
        console.log("Feedback Not Found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const saveEdit = async () => {
    try {
      await axios.put(`/api/feedback/update/${editingId}`, {
        message: editMessage,
      });
      alert("Feedback updated successfully!");
      setEditingId(null);
      fetchFeedback();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Feedback List</h2>
      {feedbackList.map((f) => (
        <div key={f._id} className="card p-3 mb-3">
          <h4>
            {f.name} {f.rating}/5
          </h4>
          <p>
            <strong>Message:</strong> {f.message}
          </p>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => startEdit(f)}
          >
            Edit
          </button>
          <button onClick={() => deleteFeedback(f._id)}>Delete</button>

          {/* Show edit form below the item */}
          {editingId === f._id && (
            <div className="mt-3">
              <input
                type="text"
                className="form-control mb-2"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
              />
              <button
                className="btn btn-success btn-sm me-2"
                onClick={saveEdit}
              >
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EditFeedback;
