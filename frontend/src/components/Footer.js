import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #212121;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  font-size: 14px;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 16px;
`;

const FooterLink = styled.a`
  color: #fff;
  margin: 0 16px;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #d4af37;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const SocialMediaIcon = styled.a`
  color: #fff;
  margin: 0 8px;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #d4af37;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#">Home</FooterLink>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinks>
      <SocialMediaIcons>
        <SocialMediaIcon href="#">
          <i className="fab fa-facebook-f"></i>
        </SocialMediaIcon>
        <SocialMediaIcon href="#">
          <i className="fab fa-twitter"></i>
        </SocialMediaIcon>
        <SocialMediaIcon href="#">
          <i className="fab fa-instagram"></i>
        </SocialMediaIcon>
        <SocialMediaIcon href="#">
          <i className="fab fa-linkedin-in"></i>
        </SocialMediaIcon>
      </SocialMediaIcons>
      <p>&copy; 2023 My Website. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
