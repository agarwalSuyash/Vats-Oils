import React from 'react';
import styled from 'styled-components';

const MapStyles = styled.div``

export default function Map() {
  return (
    <MapStyles>
      <iframe title="google map location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.5651548771893!2d77.31867711472145!3d28.642792090368054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbbf601c2131%3A0x440979668c115b1d!2sVATS%20OILS!5e0!3m2!1sen!2sin!4v1656029698082!5m2!1sen!2sin" width="100%" height="500em" style={{ border: "1px solid black", borderRadius: 10 }} allowFullScreen="allowfullscreen" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </MapStyles >
  );
}