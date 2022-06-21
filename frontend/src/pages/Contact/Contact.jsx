import React, { Fragment } from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Contact = () => {
  return (
    <Fragment >
      <Navbar />
      <div className="contactContainer">
        <a className="mailBtn" href="mailto:suyashaggarwal@gmail.com">
          <Button>Contact: Suyash@gmail.com</Button>
        </a>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
