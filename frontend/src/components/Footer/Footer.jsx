import React from 'react'
import logo from "../../images/logo.png";

import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  margin-top: auto;
`

const Container = styled.footer`
  display: flex;
  background-color: black;
  padding: 40px 20px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative;
  a{
    text-decoration: none;
  }
`;
const Image = styled.img`
    max-width: 120px;
`
const Desc = styled.p`
  margin: 20px 0px;
  color: white;
  font-size: 1.2rem;
`;
const Logo = styled.h1`
    font-size: 2.5rem;
    color: white;
    transition: all .3s ease;
    @media (min-width:991px){
      position: absolute;
    left: 150px;
    top: 10%;
    }
    &:hover{
      font-size: 2.7rem;
    }
`

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: white;
  font-size: 1.4rem;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 20px;
  color: white;
  font-size: 1.2rem;
  a {
    text-decoration: none;
    color: white;
    transition: 0.3s ease;
  }
  a:hover{
    font-size: 1.3rem;
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  color: white;
`;
const Copyright = styled.p`
text-align: center;
font-size: 20px;
margin-bottom: 0px;
`


const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Left>
          <Link to="/"><Image src={logo} alt="logo" /><Logo>Vats Oils</Logo></Link>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem><Link to="/login">Sign In</Link></ListItem>
            <ListItem><Link to="/about">About Us</Link></ListItem>
            <ListItem><Link to="/cart">View Cart</Link></ListItem>
            <ListItem><Link to="/orders">Delivery Information</Link></ListItem>
            <ListItem>Privacy Policy</ListItem>
            <ListItem><Link to="/orders">Track My Orders</Link></ListItem>
            <ListItem>Terms & Conditions</ListItem>
            <ListItem><Link to="/contact">Help</Link></ListItem>
          </List>
          <Copyright>Copyrights 2022 &copy; Suyash</Copyright>
        </Center>
        <Right>
          <Title>Contact Us</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} /> Chamber No. 9, Vindhanchal Tower, Kaushambi, Ghaziabad, Uttar Pradesh - 201010
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} /> +91 9871007795
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} /> vatsoils2001@gmail.com
          </ContactItem>
        </Right>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
