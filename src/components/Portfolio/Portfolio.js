import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';
import { galleryImages } from '../../utils/imageData';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const PortfolioSection = styled.section`
  padding: 5rem 2rem;
`;

const PortfolioTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #333;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  background: ${props => props.active ? '#333' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: ${props => props.active ? 'white' : '#333'};
    transition: all var(--animation-base) var(--ease-out-soft);
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 80%;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: ${props => props.delay}s;
  opacity: 0;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .overlay {
    opacity: 1;
  }

  &.clicked {
    animation: ${pulseAnimation} 0.4s var(--ease-out-soft);
  }

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-8px);
  }

  &:active {
    transform: scale(0.98) translateY(-8px);
    transition: transform var(--animation-quick) var(--ease-out-soft);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &.loading {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1.5s infinite;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  color: white;
  padding: 1rem;
  text-align: center;

  h3 {
    transform: translateY(-20px);
    opacity: 0;
    transition: 
      transform var(--animation-base) var(--ease-out-soft),
      opacity var(--animation-base) var(--ease-out-smooth);
  }

  p {
    transform: translateY(20px);
    opacity: 0;
    transition: 
      transform var(--animation-base) var(--ease-out-soft),
      opacity var(--animation-base) var(--ease-out-smooth);
    transition-delay: 0.1s;
  }

  &:hover {
    h3, p {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const FadeIn = styled.div`
  opacity: 0;
  animation: fadeIn 0.8s ease forwards;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ScrollReveal = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [clickedCard, setClickedCard] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [headerRef, headerVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [gridRef, gridVisible] = useIntersectionObserver({
    threshold: 0.1
  });

  const projects = galleryImages.portfolio.map(img => ({
    id: img.id,
    category: img.category,
    title: img.title,
    description: "Beautiful interior design project",
    image: img.url
  }));

  const filters = ['all', 'residential', 'commercial'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleCardClick = (id) => {
    setClickedCard(id);
    setTimeout(() => setClickedCard(null), 400);
  };

  const handleImageLoad = (id) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  return (
    <PortfolioSection>
      <ScrollReveal ref={headerRef} className={headerVisible ? 'visible' : ''}>
        <PortfolioTitle>Our Portfolio</PortfolioTitle>
        <FilterButtons>
          {filters.map(filter => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </FilterButton>
          ))}
        </FilterButtons>
      </ScrollReveal>
      
      <ProjectsGrid ref={gridRef}>
        {filteredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id}
            delay={index}
            className={`
              ${gridVisible ? 'visible' : ''}
              ${clickedCard === project.id ? 'clicked' : ''}
            `}
            onClick={() => handleCardClick(project.id)}
          >
            <ProjectImage 
              src={project.image} 
              alt={project.title}
              className={!loadedImages.has(project.id) ? 'loading' : ''}
              onLoad={() => handleImageLoad(project.id)}
            />
            <ProjectOverlay className="overlay">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </ProjectOverlay>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </PortfolioSection>
  );
}

export default Portfolio;