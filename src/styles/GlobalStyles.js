import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  :root {
    /* Base Timing Variables */
    --animation-quick: 0.2s;
    --animation-base: 0.3s;
    --animation-slow: 0.5s;
    --animation-slower: 0.7s;
    
    /* Easing Curves */
    --ease-out-soft: cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out-smooth: cubic-bezier(0.33, 1, 0.68, 1);
    --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
    
    /* Delays */
    --delay-base: 0.1s;
    --delay-increment: 0.05s;
  }

  * {
    transition-timing-function: var(--ease-out-smooth);
  }

  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: 
      opacity var(--animation-base) var(--ease-out-smooth),
      transform var(--animation-base) var(--ease-out-soft);
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Stagger children animations */
  .stagger-children > * {
    opacity: 0;
    transform: translateY(20px);
  }

  .stagger-children.visible > * {
    opacity: 1;
    transform: translateY(0);
  }

  .stagger-children.visible > *:nth-child(1) { transition-delay: calc(var(--delay-base) * 1); }
  .stagger-children.visible > *:nth-child(2) { transition-delay: calc(var(--delay-base) * 2); }
  .stagger-children.visible > *:nth-child(3) { transition-delay: calc(var(--delay-base) * 3); }
  .stagger-children.visible > *:nth-child(4) { transition-delay: calc(var(--delay-base) * 4); }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Add interaction classes */
  .clickable {
    cursor: pointer;
    transition: transform var(--animation-quick) var(--ease-out-soft);
    
    &:active {
      transform: scale(0.98);
    }
  }

  .hover-lift {
    transition: 
      transform var(--animation-base) var(--ease-out-soft),
      box-shadow var(--animation-base) var(--ease-out-smooth);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }

  .hover-scale {
    transition: transform var(--animation-base) var(--ease-out-soft);

    &:hover {
      transform: scale(1.05);
    }
  }

  /* Loading state animations */
  .skeleton-loading {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export default GlobalStyles;