import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useIntersectionObserver } from '../../utils/useIntersectionObserver';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  background: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 3rem;
  opacity: 0;
  
  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
  }
`;

const TestimonialSlider = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  
  &.visible {
    animation: ${fadeIn} 0.6s var(--ease-out-soft) forwards;
    animation-delay: 0.2s;
  }
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  transition: all 0.5s var(--ease-out-soft);
  opacity: ${props => props.active ? 1 : 0};
  transform: scale(${props => props.active ? 1 : 0.9});
`;

const Quote = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const AuthorImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #eee;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorInfo = styled.div`
  text-align: left;
  
  h4 {
    color: #333;
    margin: 0;
  }
  
  p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
  }
`;

const SliderButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SliderButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  
  &:hover {
    color: #4CAF50;
    transform: scale(1.1);
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#4CAF50' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#4CAF50' : '#ccc'};
  }
`;

const testimonials = [
  {
    id: 1,
    quote: "The team transformed our space into something beyond our imagination. Their attention to detail and understanding of our needs was exceptional.",
    author: "Sarah Johnson",
    role: "Homeowner",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    quote: "Professional, creative, and efficient. They turned our office into a modern workspace that inspires productivity and collaboration.",
    author: "Michael Chen",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 3,
    quote: "Their design expertise and commitment to excellence made our renovation project a seamless experience. Highly recommended!",
    author: "Emily Rodriguez",
    role: "Restaurant Owner",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <TestimonialsSection ref={sectionRef}>
      <Container>
        <Title className={isVisible ? 'visible' : ''}>
          What Our Clients Say
        </Title>
        
        <TestimonialSlider className={isVisible ? 'visible' : ''}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              active={index === currentIndex}
              style={{ 
                display: index === currentIndex ? 'block' : 'none'
              }}
            >
              <Quote>{testimonial.quote}</Quote>
              <Author>
                <AuthorImage>
                  <img src={testimonial.image} alt={testimonial.author} />
                </AuthorImage>
                <AuthorInfo>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </AuthorInfo>
              </Author>
            </TestimonialCard>
          ))}
          
          <SliderButtons>
            <SliderButton 
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              ←
            </SliderButton>
            <SliderButton 
              onClick={nextSlide}
              disabled={currentIndex === testimonials.length - 1}
            >
              →
            </SliderButton>
          </SliderButtons>
          
          <SliderDots>
            {testimonials.map((_, index) => (
              <Dot 
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </SliderDots>
        </TestimonialSlider>
      </Container>
    </TestimonialsSection>
  );
}

export default Testimonials;
