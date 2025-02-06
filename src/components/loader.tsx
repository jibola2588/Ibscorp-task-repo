// components/common/LoadingSpinner.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'loading'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
        width: '100%',
        position: 'relative',
        padding: '20px'
      }}
    >
      <CircularProgress 
        size={40}
        sx={{
          color: 'primary.main',
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          animation: 'fade 1.5s ease-in-out infinite',
          '@keyframes fade': {
            '0%, 100%': {
              opacity: 0.6,
            },
            '50%': {
              opacity: 1,
            },
          },
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
