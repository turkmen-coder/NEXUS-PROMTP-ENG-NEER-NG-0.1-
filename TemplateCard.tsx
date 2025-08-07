import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
  CardActionArea
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface TemplateData {
  role: string;
  taskType: string;
  task: string;
  context: string;
  format: string;
  tone: string;
  constraints: string;
}

interface TemplateCardProps {
  templateId: string;
  template: TemplateData;
  onClick: (templateId: string) => void;
  isSelected?: boolean;
}

const StyledCard = styled(Card)<{ selected?: boolean }>(({ theme, selected }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid transparent',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.light
  }
}));

const RoleTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1)
}));

const TaskDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  marginBottom: theme.spacing(2)
}));

const MetaChip = styled(Chip)(() => ({
  fontSize: '0.75rem',
  height: '24px'
}));

const TemplateCard: React.FC<TemplateCardProps> = ({
  templateId,
  template,
  onClick,
  isSelected = false
}) => {
  const handleClick = () => {
    onClick(templateId);
  };

  const getTaskTypeColor = (taskType: string) => {
    switch (taskType) {
      case 'creation': return 'success';
      case 'analysis': return 'info';
      default: return 'default';
    }
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'technical': return 'primary';
      case 'professional': return 'secondary';
      case 'creative': return 'warning';
      case 'academic': return 'info';
      case 'casual': return 'success';
      default: return 'default';
    }
  };

  return (
    <StyledCard selected={isSelected}>
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <RoleTitle variant="h6" component="h3">
            {template.role}
          </RoleTitle>
          
          <TaskDescription variant="body2">
            {template.task}
          </TaskDescription>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <MetaChip
                label={template.taskType}
                color={getTaskTypeColor(template.taskType) as any}
                size="small"
                variant="outlined"
              />
              <MetaChip
                label={template.tone}
                color={getToneColor(template.tone) as any}
                size="small"
                variant="filled"
              />
            </Stack>
            
            <Typography variant="caption" color="text.secondary">
              {template.context}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default TemplateCard;