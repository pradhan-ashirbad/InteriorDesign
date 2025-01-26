import React, { useState } from 'react';
import styled from 'styled-components';
import ServiceGallery from './ServiceGallery';

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  background: ${props => props.active ? '#333' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-soft);
  font-weight: ${props => props.active ? '600' : '400'};

  &:hover {
    background: ${props => props.active ? '#333' : '#e0e0e0'};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.3s ease-out;
  min-height: 300px;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ProcessList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProcessItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    background: #f0f0f0;
  }

  span {
    width: 30px;
    height: 30px;
    background: #333;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
  }
`;

const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const PricingCard = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background: #f9f9f9;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }

  h4 {
    color: #333;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  p {
    font-size: 1.5rem;
    font-weight: 600;
    color: #4CAF50;
  }
`;

const ServiceModalContent = ({ service }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <TabContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabButton>
          <TabButton 
            active={activeTab === 'process'} 
            onClick={() => setActiveTab('process')}
          >
            Process
          </TabButton>
          <TabButton 
            active={activeTab === 'pricing'} 
            onClick={() => setActiveTab('pricing')}
          >
            Pricing
          </TabButton>
          <TabButton 
            active={activeTab === 'gallery'} 
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </TabButton>
        </TabButtons>

        <TabContent>
          {activeTab === 'overview' && (
            <div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {service.description}
              </p>
              <h4 style={{ marginBottom: '1rem' }}>Features:</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {service.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'process' && (
            <ProcessList>
              {service.details.process.map((step, index) => (
                <ProcessItem key={index}>
                  <span>{index + 1}</span>
                  {step}
                </ProcessItem>
              ))}
            </ProcessList>
          )}

          {activeTab === 'pricing' && (
            <div>
              <p style={{ marginBottom: '2rem' }}>
                Choose the package that best fits your needs:
              </p>
              <PricingContainer>
                {Object.entries(service.details.pricing).map(([level, price]) => (
                  <PricingCard key={level}>
                    <h4>{level}</h4>
                    <p>{price}</p>
                  </PricingCard>
                ))}
              </PricingContainer>
            </div>
          )}

          {activeTab === 'gallery' && (
            <ServiceGallery images={service.details.gallery} />
          )}
        </TabContent>
      </TabContainer>
    </div>
  );
};

export default ServiceModalContent;
