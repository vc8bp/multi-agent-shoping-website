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
  align-items: center;
  margin-bottom: 16px;
`;

const SocialMediaIcon = styled.a`
  color: #fff;
  margin: 0 8px;
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  >* {
    width: 40px;
    height: 40px;

  }

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
        <SocialMediaIcon href="https://facebook.com">
          <img alt='Facebook' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"></img>
        </SocialMediaIcon>
        <SocialMediaIcon href="https://twitter.com">
          <img alt='twitter' src='https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png' ></img>
        </SocialMediaIcon>
        <SocialMediaIcon href="https://instagram.com">
          <img alt='instagram' src="https://cdn-icons-png.flaticon.com/512/174/174855.png"></img>
        </SocialMediaIcon>
      </SocialMediaIcons>
      <p>&copy; 2023 My Website. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
