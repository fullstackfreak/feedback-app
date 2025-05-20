import React, { useState, useEffect } from "react";
import axios from "axios";

import EditFeedback from "./EditFeedback";

const FeedbackList = () => {
  useEffect(() => {
    axios
      .get("https://feedback-app-back.vercel.app/api/feedback/all")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <EditFeedback />
    </>
  );
};

export default FeedbackList;
