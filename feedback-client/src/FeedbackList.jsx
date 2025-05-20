import React, { useState, useEffect } from "react";
import axios from "axios";

import EditFeedback from "./EditFeedback";

const FeedbackList = () => {


  useEffect(() => {
    axios
      .get("/api/feedback/all")
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
