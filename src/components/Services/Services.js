import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';
import ServiceModal from './ServiceModal';
import { serviceDetails } from '../../utils/imageData';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ServicesSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
  opacity: 0;
  
  &.visible {
    animation: ${fadeIn} var(--animation-slow) var(--ease-out-soft) forwards;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;

  &.visible > * {
    animation: ${fadeIn} var(--animation-slow) var(--ease-out-soft) forwards;
  }

  & > *:nth-child(1) { animation-delay: 0.2s; }
  & > *:nth-child(2) { animation-delay: 0.4s; }
  & > *:nth-child(3) { animation-delay: 0.6s; }
  & > *:nth-child(4) { animation-delay: 0.8s; }
`;

const ServiceCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all var(--animation-base) var(--ease-out-soft);
  opacity: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(-8px);
  }

  &.active {
    border: 2px solid #4CAF50;
    animation: ${pulse} 0.3s var(--ease-out-soft);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #2196F3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s var(--ease-out-soft);
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #333;
  transition: all var(--animation-base) var(--ease-out-soft);
  position: relative;

  ${ServiceCard}:hover & {
    animation: ${float} 2s infinite ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: #4CAF50;
    opacity: 0;
    transition: all 0.3s var(--ease-out-soft);
  }

  ${ServiceCard}:hover &::after {
    opacity: 1;
    width: 50px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const ServiceFeature = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #555;

  &:before {
    content: "✓";
    margin-right: 0.5rem;
    color: #4CAF50;
  }
`;

const FeatureTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 0.9rem;
  margin: 0.25rem;
  transition: all 0.3s var(--ease-out-soft);

  &:hover {
    background: #4CAF50;
    color: white;
    transform: scale(1.05);
  }
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #4CAF50, #2196F3);
    transition: width 0.5s var(--ease-out-soft);
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

function Services() {
  const [sectionRef, isSectionVisible] = useIntersectionObserver({
    threshold: 0.1
  });
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [progress, setProgress] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const services = [
    {
      icon: "🏠",
      title: "Residential Design",
      description: "Transform your living space into a personalized sanctuary.",
      features: [
        "Custom furniture selection",
        "Color scheme consultation",
        "Space planning",
        "Lighting design"
      ],
      details: serviceDetails.residential
    },
    {
      icon: "🏢",
      title: "Commercial Design",
      description: "Create inspiring workspaces that boost productivity.",
      features: [
        "Office layout optimization",
        "Brand integration",
        "Ergonomic solutions",
        "Commercial lighting"
      ],
      details: serviceDetails.commercial
    },
    {
      icon: "🎨",
      title: "Color Consultation",
      description: "Find the perfect color palette for your space.",
      features: [
        "Color psychology",
        "Paint selection",
        "Material coordination",
        "Mood board creation"
      ]
    },
    {
      icon: "📐",
      title: "Space Planning",
      description: "Optimize your layout for maximum efficiency.",
      features: [
        "Traffic flow analysis",
        "Furniture arrangement",
        "Storage solutions",
        "3D visualization"
      ]
    }
  ];

  return (
    <ServicesSection ref={sectionRef}>
      <Container>
        <SectionTitle className={isSectionVisible ? 'visible' : ''}>
          Our Services
        </SectionTitle>
        <ServicesGrid className={isSectionVisible ? 'visible' : ''}>
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              className={activeCard === index ? 'active' : ''}
              onClick={() => handleCardClick(service)}
            >
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {service.features.map((feature, featureIndex) => (
                  <FeatureTag
                    key={featureIndex}
                    onMouseEnter={() => setHoveredFeature(`${index}-${featureIndex}`)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    style={{
                      transform: hoveredFeature === `${index}-${featureIndex}` 
                        ? 'scale(1.05)' 
                        : 'scale(1)'
                    }}
                  >
                    {feature}
                  </FeatureTag>
                ))}
              </div>
              {activeCard === index && (
                <ProgressBar progress={progress[index] || 0} />
              )}
            </ServiceCard>
          ))}
        </ServicesGrid>
        <ViewAllButton to="/services">
          View All Services
        </ViewAllButton>
      </Container>

      {selectedService && (
        <ServiceModal 
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </ServicesSection>
  );
}

export default Services;