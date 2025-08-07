import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: `radial-gradient(1200px 600px at 20% -10%, rgba(255,255,255,0.15), transparent),
               linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  padding: '80px 0 70px',
  borderRadius: '0 0 40px 40px',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1
  }
}));

const ContentWrapper = styled(Box)({
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px'
});

const FeatureChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.text.primary,
  padding: '8px 16px',
  '& .MuiChip-icon': {
    color: theme.palette.success.main
  }
}));

const HeroSection: React.FC = () => {
  const features = [
    'Gerçek Zekâ Testi',
    'Akıllı Öneriler',
    'Canlı Önizleme'
  ];

  return (
    <HeroContainer>
      <ContentWrapper>
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          NEXUS 0.1 ENGINEERING
        </Typography>
        
        <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          NEXUS 0.1
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          flexWrap="wrap"
          sx={{ gap: 2 }}
        >
          {features.map((feature, index) => (
            <FeatureChip
              key={index}
              icon={<CheckCircleIcon />}
              label={feature}
              variant="filled"
            />
          ))}
        </Stack>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;