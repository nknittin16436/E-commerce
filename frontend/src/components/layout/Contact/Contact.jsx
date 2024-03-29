import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:nknittin16436@outlook.com">
        <Button>Contact: nknittin16436@outlook.com</Button>
      </a>
    </div>
  );
};

export default Contact;