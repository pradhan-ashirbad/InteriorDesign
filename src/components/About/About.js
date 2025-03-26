import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutSection = styled.section`
  padding: 5rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0;

  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: transform 0.3s var(--ease-out-soft);

  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
    animation-delay: ${props => props.delay}s;
  }

  &:hover {
    transform: translateY(-10px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TeamSection = styled.div`
  margin-top: 5rem;
  text-align: center;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TeamMember = styled.div`
  opacity: 0;

  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
    animation-delay: ${props => props.delay}s;
  }
`;

const MemberImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const MemberName = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #666;
  font-style: italic;
`;

function About() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [valuesRef, areValuesVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [teamRef, isTeamVisible] = useIntersectionObserver({ threshold: 0.2 });

  const values = [
    {
      icon: "💡",
      title: "Innovation",
      description: "We push boundaries and embrace new design trends to create unique spaces."
    },
    {
      icon: "🎯",
      title: "Precision",
      description: "Every detail matters in creating perfectly balanced interiors."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "We work closely with clients to bring their vision to life."
    }
  ];

  const team = [
    {
      name: "Sarah Anderson",
      role: "Lead Designer",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Emma Wilson",
      role: "Interior Architect",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <AboutSection>
      <Container>
        <Header ref={headerRef} className={isHeaderVisible ? 'visible' : ''}>
          <Title>About Us</Title>
          <Subtitle>
            We're passionate about creating beautiful, functional spaces that inspire
            and enhance your daily life.
          </Subtitle>
        </Header>

        <Grid ref={valuesRef}>
          {values.map((value, index) => (
            <Card 
              key={index}
              className={areValuesVisible ? 'visible' : ''}
              delay={0.2 * index}
            >
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </Card>
          ))}
        </Grid>

        
      </Container>
    </AboutSection>
  );
}

export default About;
