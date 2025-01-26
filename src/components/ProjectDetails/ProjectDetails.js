import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProjectDetailsSection = styled.section`
  padding: 5rem 2rem;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #4CAF50;
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 3rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ProjectMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  h4 {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  p {
    color: #333;
    font-weight: 500;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: 0.2s;
`;

const ProjectImage = styled.div`
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  opacity: 0;
  animation: ${fadeIn} 0.6s forwards;
  animation-delay: 0.4s;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Description = styled.div`
  h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
  }

  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const Sidebar = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 15px;
  height: fit-content;
`;

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch project details from an API
    // For now, we'll use mock data
    const mockProject = {
      id: id,
      title: "Modern Minimalist Home",
      location: "New York, NY",
      duration: "4 months",
      area: "2,500 sq ft",
      budget: "$150,000",
      description: `
        This modern minimalist home renovation project focused on creating an open, 
        light-filled space that maximizes functionality while maintaining clean lines 
        and a serene atmosphere. The project involved complete restructuring of the 
        interior space, including:

        • Open-concept living area
        • Custom kitchen with hidden storage solutions
        • Minimalist master suite
        • Smart home integration
        • Sustainable materials throughout
      `,
      images: [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg",
        "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg"
      ],
      specs: {
        "Style": "Modern Minimalist",
        "Completion": "2023",
        "Services": "Full Interior Design",
        "Materials": "Sustainable Materials",
        "Features": "Smart Home Integration"
      }
    };

    setProject(mockProject);
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <ProjectDetailsSection>
      <Container>
        <BackButton to="/">← Back to Projects</BackButton>
        
        <ProjectHeader>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectMeta>
            <MetaItem>
              <h4>Location</h4>
              <p>{project.location}</p>
            </MetaItem>
            <MetaItem>
              <h4>Duration</h4>
              <p>{project.duration}</p>
            </MetaItem>
            <MetaItem>
              <h4>Area</h4>
              <p>{project.area}</p>
            </MetaItem>
            <MetaItem>
              <h4>Budget</h4>
              <p>{project.budget}</p>
            </MetaItem>
          </ProjectMeta>
        </ProjectHeader>

        <ImageGrid>
          {project.images.map((image, index) => (
            <ProjectImage key={index}>
              <img src={image} alt={`Project view ${index + 1}`} />
            </ProjectImage>
          ))}
        </ImageGrid>

        <ProjectContent>
          <Description>
            <h2>Project Overview</h2>
            <p>{project.description}</p>
          </Description>
          <Sidebar>
            <h3>Project Specifications</h3>
            {Object.entries(project.specs).map(([key, value]) => (
              <MetaItem key={key}>
                <h4>{key}</h4>
                <p>{value}</p>
              </MetaItem>
            ))}
          </Sidebar>
        </ProjectContent>
      </Container>
    </ProjectDetailsSection>
  );
};

export default ProjectDetails;
