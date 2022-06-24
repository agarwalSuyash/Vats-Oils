import React, { Fragment } from "react";
import "./Contact.css";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MetaData from "../../components/MetaData";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact = () => {
  return (
    <Fragment >
      <Navbar />
      <MetaData title="Contact Us" />
      <section className="contact">
        <div className="content">
          <h2>Contact Us</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ut ullam tempora iure.</p>
        </div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="icon"><PlaceIcon /></div>
              <div className="text">
                <h3>Address</h3>
                <p>Chamber No. 9,Vindhanchal Toweer, Kaushambi, Ghaziabad, Uttar Pradesh - 201010</p>
              </div>
            </div>
            <div className="box">
              <div className="icon"><PhoneIcon /></div>
              <div className="text">
                <h3>Phone</h3>
                <p>+91 9871007795</p>
              </div>
            </div>
            <div className="box">
              <a href="mailto:vatsoils2001@gmail.com"><div className="icon"><MailIcon /></div></a>
              <div className="text">
                <a href="mailto:vatsoils2001@gmail.com">
                  <h3>Email</h3>
                  <p>vatsoils2001@gmail.com</p>
                </a>
              </div>
            </div>
            <div className="box">
              <div className="icon"><AccessTimeIcon /></div>
              <div className="text">
                <h3>Timings</h3>
                <p>Mon - Sun 4:00 PM to 8:00 PM</p>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe
              title="google map location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5651548771893!2d77.31867711472145!3d28.642792090368054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbbf601c2131%3A0x440979668c115b1d!2sVATS%20OILS!5e0!3m2!1sen!2sin!4v1656029698082!5m2!1sen!2sin"
              width="100%"
              height="500em"
              style={{ border: "1px solid black", borderRadius: 10 }}
              allowFullScreen="allowfullscreen"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Contact;
