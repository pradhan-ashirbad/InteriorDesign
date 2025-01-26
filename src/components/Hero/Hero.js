import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 90vh;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
    url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.8;
  }

  button {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #444;
    }
  }
`;

function Hero() {
  return (
    <HeroSection>
      <HeroContent>
        <h1>Elevate Your Space</h1>
        <p>Award-winning interior design studio specializing in creating timeless, sophisticated spaces that inspire and delight.</p>
        <button>Schedule a Consultation</button>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;