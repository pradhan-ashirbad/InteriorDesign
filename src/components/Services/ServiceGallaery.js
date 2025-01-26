import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const GalleryContainer = styled.div`
  position: relative;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-soft);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  animation: ${fadeIn} 0.3s ease-out;
`;

const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  animation: ${slideIn} 0.3s var(--ease-out-soft);
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev { left: 2rem; }
  &.next { right: 2rem; }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ServiceGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setSelectedImage(images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setSelectedImage(images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          handlePrevious(e);
          break;
        case 'ArrowRight':
          handleNext(e);
          break;
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentIndex]);

  return (
    <GalleryContainer>
      <GalleryGrid>
        {images.map((image, index) => (
          <ThumbnailImage
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            onClick={() => handleImageClick(image, index)}
            loading="lazy"
          />
        ))}
      </GalleryGrid>

      {selectedImage && (
        <FullscreenOverlay onClick={handleClose}>
          <FullscreenImage 
            src={selectedImage} 
            alt="Full size image"
            onClick={(e) => e.stopPropagation()}
          />
          <NavigationButton 
            className="prev" 
            onClick={handlePrevious}
          >
            ←
          </NavigationButton>
          <NavigationButton 
            className="next" 
            onClick={handleNext}
          >
            →
          </NavigationButton>
          <CloseButton onClick={handleClose}>×</CloseButton>
          <ImageCounter>
            {currentIndex + 1} / {images.length}
          </ImageCounter>
        </FullscreenOverlay>
      )}
    </GalleryContainer>
  );
};

export default ServiceGallery;
