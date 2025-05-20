import React, { useState } from "react";
import axios from "axios";
import EditFeedback from "./EditFeedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [go, setGo] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.message || form.message.trim() === "") {
        setError("Feedback Message is required");
        return;
      }

      await axios.post(
        "https://feedback-app-backtwo.vercel.app/api/feedback/submit",
        form
      );
      toast.success("Feedback Submitted Successfully");
      setError("");
      setGo(true);
      setForm({
        name: "",
        email: "",
        message: "",
        rating: 1,
      });
    } catch (err) {
      toast.error("Oops! something went wrong");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          value={form.message}
        ></textarea>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          min="1"
          max="5"
          onChange={handleChange}
          value={form.rating}
        />
        <button type="submit">Submit</button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}
      <EditFeedback but={go} setGo={setGo} />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
