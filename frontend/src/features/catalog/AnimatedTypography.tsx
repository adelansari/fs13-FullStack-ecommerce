import React from 'react';
import { Typography, Fade } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

// Define a global style for the keyframes animation
const GlobalStyle = createGlobalStyle`
  @keyframes colorChange {
    0% {
      color: green;
    }
    25% {
      color: orange;
    }
    50% {
      color: blue;
    }
    75% {
      color: red;
    }
    100% {
      color: green;
    }
  }
`;

// Define a custom component that uses the Fade and Typography components
const AnimatedTypography = (props) => {
  // Define a custom style for the typography component
  const sx = {
    // Use the keyframes animation with a duration of 2 seconds
    animation: 'colorChange 5s infinite',
    // Use the theme breakpoints to change the font size
    '@media (min-width:600px)': {
      fontSize: '3rem',
    },
    '@media (max-width:599px)': {
      fontSize: '2rem',
    },
  };

  // Return the component with the props and style
  return (
    <>
      <GlobalStyle />
      <Fade in={true}>
        <Typography variant="h4" sx={sx} {...props} />
      </Fade>
    </>
  );
};

// Export the component
export default AnimatedTypography;
