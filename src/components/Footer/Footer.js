import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 1rem;
  }

  a {
    color: #ccc;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      color: #fff;
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
      background: #4CAF50;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
  font-size: 0.9rem;
`;

const Newsletter = styled.div`
  margin-top: 1rem;

  input {
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    margin-right: 0.5rem;
    width: 200px;
  }

  button {
    padding: 0.8rem 1.5rem;
    background: #4CAF50;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #45a049;
      transform: translateY(-2px);
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            We create beautiful and functional spaces that inspire and enhance your daily life. Our passion for design drives us to deliver exceptional results.
          </p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📱</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼</a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Services</h3>
          <FooterLinks>
            <li><Link to="/services/residential">Residential Design</Link></li>
            <li><Link to="/services/commercial">Commercial Design</Link></li>
            <li><Link to="/services/consultation">Color Consultation</Link></li>
            <li><Link to="/services/space-planning">Space Planning</Link></li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p style={{ color: '#ccc', marginBottom: '1rem' }}>
            Subscribe to our newsletter for design tips and updates.
          </p>
          <Newsletter>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </Newsletter>
        </FooterSection>
      </FooterContent>

      <Copyright>
        <p>&copy; {new Date().getFullYear()} Interior Design Studio. All rights reserved.</p>
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;