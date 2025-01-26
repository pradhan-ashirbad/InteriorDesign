import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';

// First define all animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-30px);
  }
  to { 
    opacity: 1; 
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from { 
    transform: scale(0.95);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
`;

// Then define base styled components
const ServicesPage = styled.div`
  padding: 120px 0 80px;
`;

const Hero = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 80px;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: 0.2s;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

// Define components that will be referenced by others
const ServiceImage = styled.div`
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const ServiceContent = styled.div`
  padding: 2rem;
`;

const PriceTag = styled.div`
  background: #4CAF50;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  font-weight: 500;
`;

// Then define components that reference others
const ServiceCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: ${scaleIn} 0.6s forwards;
  animation-delay: ${props => props.index * 0.2}s;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);

    ${ServiceImage} img {
      transform: scale(1.1) rotate(1deg);
    }

    ${ServiceContent} {
      transform: translateY(-5px);
    }

    ${PriceTag} {
      background: #45a049;
    }
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    padding: 0.5rem 0;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:before {
      content: "✓";
      color: #4CAF50;
      font-weight: bold;
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4CAF50;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
  }

  &:before {
    content: '←';
    font-size: 1.2rem;
  }
`;

const services = [
  {
    id: 1,
    title: "Residential Interior Design",
    description: "Transform your home into a personalized sanctuary with our comprehensive residential design services.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    price: "Starting from $2,500",
    features: [
      "Initial consultation and concept development",
      "Space planning and layout optimization",
      "Custom furniture selection",
      "Color scheme and material selection",
      "Project management and implementation"
    ]
  },
  {
    id: 2,
    title: "Commercial Interior Design",
    description: "Create inspiring workspaces that boost productivity and reflect your brand identity.",
    image: "https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg",
    price: "Starting from $5,000",
    features: [
      "Brand integration in design",
      "Space efficiency planning",
      "Ergonomic workspace design",
      "Lighting and acoustic solutions",
      "Commercial-grade furniture selection"
    ]
  },
  {
    id: 3,
    title: "Renovation Consulting",
    description: "Expert guidance for your renovation project from start to finish.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    price: "Starting from $1,500",
    features: [
      "Renovation planning and budgeting",
      "Contractor coordination",
      "Material and finish selection",
      "Timeline management",
      "Quality control and inspection"
    ]
  },
  {
    id: 4,
    title: "Smart Home Integration",
    description: "Seamlessly integrate smart technology into your interior design for modern living.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    price: "Starting from $3,500",
    features: [
      "Smart lighting system design",
      "Home automation integration",
      "Security system planning",
      "Entertainment system setup",
      "Energy efficiency optimization"
    ]
  },
  {
    id: 5,
    title: "Sustainable Design",
    description: "Eco-friendly interior design solutions for environmentally conscious clients.",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    price: "Starting from $3,000",
    features: [
      "Sustainable material selection",
      "Energy-efficient solutions",
      "Waste reduction strategies",
      "Natural lighting optimization",
      "Green certification guidance"
    ]
  },
  {
    id: 6,
    title: "3D Visualization",
    description: "Bring your design ideas to life with photorealistic 3D renderings.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    price: "Starting from $1,000",
    features: [
      "Photorealistic 3D rendering",
      "Virtual reality walkthrough",
      "Material and finish visualization",
      "Lighting simulation",
      "Design revision support"
    ]
  },
  {
    id: 7,
    title: "Kitchen & Bath Design",
    description: "Specialized design services for the most important rooms in your home.",
    image: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg",
    price: "Starting from $2,800",
    features: [
      "Layout optimization",
      "Appliance selection",
      "Storage solutions",
      "Material and fixture selection",
      "Plumbing coordination"
    ]
  },
  {
    id: 8,
    title: "Color Consultation",
    description: "Expert color scheme development for your space.",
    image: "https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg",
    price: "Starting from $500",
    features: [
      "Color psychology analysis",
      "Custom palette creation",
      "Paint selection",
      "Material coordination",
      "Lighting considerations"
    ]
  },
  {
    id: 9,
    title: "Furniture Design",
    description: "Custom furniture design and selection services.",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    price: "Starting from $2,000",
    features: [
      "Custom furniture design",
      "Material selection",
      "Prototype development",
      "Production coordination",
      "Installation supervision"
    ]
  }
];

function Services() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <ServicesPage>
      <Hero>
        <HeroContent>
          <Title>Our Services</Title>
          <Subtitle>
            Comprehensive interior design solutions tailored to your needs
          </Subtitle>
        </HeroContent>
      </Hero>

      <Container>
        <BackLink to="/">Back to Home</BackLink>
        <ServiceGrid ref={headerRef}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} index={index}>
              <ServiceImage>
                <img src={service.image} alt={service.title} />
              </ServiceImage>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                <PriceTag>{service.price}</PriceTag>
                <FeatureList>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </FeatureList>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </Container>
    </ServicesPage>
  );
}

export default Services;