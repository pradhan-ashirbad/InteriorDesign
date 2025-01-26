import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.scrolled ? 'white' : 'transparent'};
  padding: 1rem 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  font-weight: 500;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 2px;
    background: #4CAF50;
    transition: width 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    width: 100%;
  }
`;

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo to="/" scrolled={scrolled}>
          Interior Design Co.
        </Logo>
        <NavLinks>
          <NavLink 
            to="/" 
            scrolled={scrolled}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            scrolled={scrolled}
            className={location.pathname === '/services' ? 'active' : ''}
          >
            Services
          </NavLink>
          <NavLink 
            to="/portfolio" 
            scrolled={scrolled}
            className={location.pathname === '/portfolio' ? 'active' : ''}
          >
            Portfolio
          </NavLink>
          <NavLink 
            to="/contact" 
            scrolled={scrolled}
            className={location.pathname === '/contact' ? 'active' : ''}
          >
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;