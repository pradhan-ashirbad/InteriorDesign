import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

// Animations
const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const expandIn = keyframes`
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const rotateIn = keyframes`
  from { transform: rotate(-5deg) scale(0.9); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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

// Base Components
const ProjectsSection = styled.section`
  padding: 5rem 2rem;
  background: #f9f9f9;
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
    animation: ${slideUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  opacity: 0;

  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
    animation-delay: 0.2s;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Component Parts
const ProjectImage = styled.div`
  height: 250px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #4CAF50;
    transition: width 0.3s ease;
  }
`;

const ProjectDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const DetailItem = styled.div`
  h4 {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 0.3rem;
  }

  p {
    color: #333;
    font-weight: 500;
  }
`;

const ViewButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:active::after {
    width: 300px;
    height: 300px;
  }
`;

// Main Component
const ProjectCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform-origin: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: ${scaleIn} 0.6s var(--ease-out-soft) forwards;
  animation-delay: ${props => props.index * 0.2}s;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);

    ${ProjectImage} {
      &::after {
        opacity: 1;
        transition-delay: 0.1s;
      }

      img {
        transform: scale(1.1) rotate(1deg);
      }
    }

    ${ProjectTitle} {
      transform: translateY(-5px);
      
      &::after {
        width: 100%;
      }
    }

    ${ProjectDetails} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Data
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'renovation', name: 'Renovation' }
];

const projects = [
  {
    id: 1,
    title: "Modern Minimalist Home",
    description: "A complete home renovation focusing on clean lines and minimalist design principles.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    location: "New York, NY",
    duration: "4 months",
    area: "2,500 sq ft",
    budget: "$150,000",
    category: "residential",
    tags: ["Minimalist", "Modern", "Renovation"]
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    description: "High-end penthouse renovation combining contemporary luxury with classic elements.",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
    location: "Miami, FL",
    duration: "6 months",
    area: "3,800 sq ft",
    budget: "$450,000",
    category: "residential",
    tags: ["Luxury", "Contemporary", "Penthouse"]
  },
  {
    id: 3,
    title: "Boutique Restaurant Design",
    description: "Modern restaurant design with focus on ambiance and dining experience.",
    image: "https://images.pexels.com/photos/6480707/pexels-photo-6480707.jpeg",
    location: "Chicago, IL",
    duration: "3 months",
    area: "1,800 sq ft",
    budget: "$280,000",
    category: "hospitality",
    tags: ["Restaurant", "Modern", "Commercial"]
  },
  {
    id: 4,
    title: "Urban Loft Conversion",
    description: "Industrial loft transformed into a modern living space while preserving historic elements.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    location: "Boston, MA",
    duration: "5 months",
    area: "2,200 sq ft",
    budget: "$320,000",
    category: "renovation",
    tags: ["Industrial", "Loft", "Historic"]
  },
  {
    id: 5,
    title: "Coastal Beach House",
    description: "Beachfront property renovation with focus on natural light and ocean views.",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    location: "San Diego, CA",
    duration: "4 months",
    area: "2,800 sq ft",
    budget: "$380,000",
    category: "residential",
    tags: ["Coastal", "Modern", "Luxury"]
  },
  {
    id: 6,
    title: "Corporate Office Space",
    description: "Modern office design promoting collaboration and productivity.",
    image: "https://images.pexels.com/photos/1743555/pexels-photo-1743555.jpeg",
    location: "Seattle, WA",
    duration: "3 months",
    area: "5,000 sq ft",
    budget: "$500,000",
    category: "commercial",
    tags: ["Office", "Corporate", "Modern"]
  },
  {
    id: 7,
    title: "Scandinavian Studio",
    description: "Small space optimization with Scandinavian design principles.",
    image: "https://images.pexels.com/photos/1150962/pexels-photo-1150962.jpeg",
    location: "Portland, OR",
    duration: "2 months",
    area: "800 sq ft",
    budget: "$95,000",
    category: "residential",
    tags: ["Scandinavian", "Studio", "Minimal"]
  },
  {
    id: 8,
    title: "Wellness Spa Retreat",
    description: "Luxury spa design focusing on relaxation and natural elements.",
    image: "https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg",
    location: "Austin, TX",
    duration: "4 months",
    area: "3,200 sq ft",
    budget: "$420,000",
    category: "hospitality",
    tags: ["Spa", "Wellness", "Luxury"]
  },
  {
    id: 9,
    title: "Historic Brownstone",
    description: "Historic home renovation balancing modern amenities with period details.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    location: "Philadelphia, PA",
    duration: "7 months",
    area: "4,200 sq ft",
    budget: "$580,000",
    category: "renovation",
    tags: ["Historic", "Renovation", "Luxury"]
  }
];

// Add new styled components for filtering
const FilterContainer = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 30px;
  background: ${props => props.active ? '#4CAF50' : '#fff'};
  color: ${props => props.active ? '#fff' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  padding: 0.3rem 0.8rem;
  background: #f0f0f0;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #666;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    background: #4CAF50;
    color: white;
  }
`;

const ProjectStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    background: #f0f0f0;
  }
`;

// Component
function Projects() {
  const [headerRef, isHeaderVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [projectsRef, areProjectsVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <ProjectsSection>
      <Container>
        <Header ref={headerRef} className={isHeaderVisible ? 'visible' : ''}>
          <Title>Featured Projects</Title>
          <Subtitle>
            Explore our carefully curated collection of completed interior design projects.
          </Subtitle>
        </Header>

        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProjectGrid ref={projectsRef} className={areProjectsVisible ? 'visible' : ''}>
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} index={index}>
              <ProjectImage>
                <img src={project.image} alt={project.title} />
              </ProjectImage>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <TagsContainer>
                  {project.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsContainer>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectStats>
                  <DetailItem>
                    <h4>Location</h4>
                    <p>{project.location}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Duration</h4>
                    <p>{project.duration}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Area</h4>
                    <p>{project.area}</p>
                  </DetailItem>
                  <DetailItem>
                    <h4>Budget</h4>
                    <p>{project.budget}</p>
                  </DetailItem>
                </ProjectStats>
                <ViewButton>View Project Details</ViewButton>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </Container>
    </ProjectsSection>
  );
}

export default Projects;
