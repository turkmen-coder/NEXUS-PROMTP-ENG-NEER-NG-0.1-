import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  // Chip,
  Stack,
  Button,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Slider,
  Paper,
  Grid,
  Alert,
  IconButton,
  Tooltip,
  Divider,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ExpandMore as ExpandMoreIcon,
  ContentCopy as ContentCopyIcon,
  PlayArrow as PlayArrowIcon,
  Assessment as AssessmentIcon,
  // Settings as SettingsIcon,
  // Lightbulb as LightbulbIcon,
  // Psychology as PsychologyIcon
} from '@mui/icons-material';

import { templateCategories, getTemplatesByCategory, TemplateData } from '../templates';
import { techniqueCategories, getTechniquesByCategory, AITechnique, buildTechniquePrompt } from '../aiTechniques';
import { assessPromptQuality, getQualityColor, getQualityIcon, calculateTokenCount, estimateCost, QualityMetrics } from '../qualityAssessment';

const GlassCard = styled(Card)(() => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TemplateGrid = styled(Grid)(() => ({
  maxHeight: '300px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
  },
}));

interface PromptBuilderProps {
  onPromptGenerated: (prompt: string, quality: QualityMetrics) => void;
  onTestPrompt: (prompt: string, model: string) => void;
  models: any[];
}

const PromptBuilder: React.FC<PromptBuilderProps> = ({ 
  onPromptGenerated, 
  onTestPrompt,
  models 
}) => {
  // Form States
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [customRole, setCustomRole] = useState('');
  const [useCustomRole, setUseCustomRole] = useState(false);
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [outputFormat, setOutputFormat] = useState('text');
  const [tone, setTone] = useState('professional');
  const [constraints, setConstraints] = useState('');
  const [examples, setExamples] = useState('');
  // const [language, setLanguage] = useState('tr');
  
  // AI Techniques
  const [enabledTechniques, setEnabledTechniques] = useState<AITechnique[]>([]);
  const [creativity, setCreativity] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  
  // UI States
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [quality, setQuality] = useState<QualityMetrics | null>(null);
  // const [currentStep, setCurrentStep] = useState(1);
  const [expandedPanel, setExpandedPanel] = useState<string | false>('role');
  const [selectedModel, setSelectedModel] = useState(models[0]?.id || '');

  // Generate prompt and assess quality
  const generatedPrompt = useMemo(() => {
    const role = useCustomRole ? customRole : selectedTemplate?.role || '';
    const taskDesc = task || selectedTemplate?.task || '';
    const contextDesc = context || selectedTemplate?.context || '';
    const format = outputFormat || selectedTemplate?.format || 'text';
    const toneDesc = tone || selectedTemplate?.tone || 'professional';
    const constraintsDesc = constraints || selectedTemplate?.constraints || '';
    const examplesDesc = examples || selectedTemplate?.examples || '';

    if (!role && !taskDesc) return '';

    let prompt = '';
    
    if (role) {
      prompt += `Sen bir ${role}sın.\n\n`;
    }
    
    if (taskDesc) {
      prompt += `Görevin: ${taskDesc}\n\n`;
    }
    
    if (contextDesc) {
      prompt += `Bağlam: ${contextDesc}\n\n`;
    }
    
    if (format && format !== 'text') {
      prompt += `Format: ${format}\n`;
    }
    
    if (toneDesc && toneDesc !== 'professional') {
      prompt += `Ton: ${toneDesc}\n`;
    }
    
    if (constraintsDesc) {
      prompt += `Kısıtlamalar: ${constraintsDesc}\n`;
    }
    
    if (examplesDesc) {
      prompt += `Örnekler: ${examplesDesc}\n\n`;
    }

    // Apply AI techniques
    const finalPrompt = buildTechniquePrompt(prompt.trim(), enabledTechniques);
    
    return finalPrompt;
  }, [
    useCustomRole, customRole, selectedTemplate, task, context, 
    outputFormat, tone, constraints, examples, enabledTechniques
  ]);

  // Assess quality whenever prompt changes
  useEffect(() => {
    if (generatedPrompt) {
      const assessment = assessPromptQuality({
        role: selectedTemplate?.role,
        task: task || selectedTemplate?.task,
        context: context || selectedTemplate?.context,
        format: outputFormat,
        tone,
        constraints,
        examples,
        customRole,
        useCustomRole,
        enabledTechniques
      });
      setQuality(assessment);
      onPromptGenerated(generatedPrompt, assessment);
    }
  }, [generatedPrompt, onPromptGenerated]);

  const handleTemplateSelect = (template: TemplateData) => {
    setSelectedTemplate(template);
    setUseCustomRole(false);
    setTask(template.task);
    setContext(template.context);
    setOutputFormat(template.format);
    setTone(template.tone);
    setConstraints(template.constraints);
    setExamples(template.examples || '');
    setCurrentStep(2);
    setExpandedPanel('context');
  };

  const handleTechniqueToggle = (technique: AITechnique) => {
    setEnabledTechniques(prev => {
      const exists = prev.find(t => t.id === technique.id);
      if (exists) {
        return prev.filter(t => t.id !== technique.id);
      } else {
        return [...prev, technique];
      }
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  const testPrompt = () => {
    if (generatedPrompt && selectedModel) {
      onTestPrompt(generatedPrompt, selectedModel);
    }
  };

  const tokenCount = calculateTokenCount(generatedPrompt);
  const estimatedOutputTokens = Math.min(tokenCount * 2, 1000); // Rough estimate
  const cost = estimateCost(tokenCount, estimatedOutputTokens, selectedModel);

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          🚀 NEXUS AI Prompt Builder
        </Typography>

        <Grid container spacing={3}>
          {/* Left Sidebar - Configuration */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={2}>
              {/* Quality Assessment */}
              {quality && (
                <ProgressContainer>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <AssessmentIcon color="primary" />
                    <Typography variant="h6">
                      Kalite: {getQualityIcon(quality.overall)} {quality.overall}%
                    </Typography>
                  </Stack>
                  
                  <LinearProgress
                    variant="determinate"
                    value={quality.overall}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getQualityColor(quality.overall),
                        borderRadius: 4,
                      }
                    }}
                  />
                  
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    {quality.suggestions.slice(0, 2).map((suggestion, index) => (
                      <Alert key={index} severity="info" size="small">
                        {suggestion}
                      </Alert>
                    ))}
                  </Stack>
                </ProgressContainer>
              )}

              {/* Token and Cost Info */}
              <GlassCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📊 Token & Maliyet
                  </Typography>
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Input Tokens:</Typography>
                      <Typography variant="body2" fontWeight="bold">{tokenCount}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">Tahmini Maliyet:</Typography>
                      <Typography variant="body2" fontWeight="bold">${cost.total.toFixed(4)}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </GlassCard>

              {/* Model Selection */}
              <GlassCard>
                <CardContent>
                  <FormControl fullWidth>
                    <InputLabel>AI Model</InputLabel>
                    <Select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      label="AI Model"
                    >
                      {models.map(model => (
                        <MenuItem key={model.id} value={model.id}>
                          {model.name} ({model.provider})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </GlassCard>
            </Stack>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={2}>
              {/* Step 1: Role & Template Selection */}
              <Accordion expanded={expandedPanel === 'role'} onChange={() => setExpandedPanel(expandedPanel === 'role' ? false : 'role')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    1️⃣ Rol & Şablon Seçimi
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {/* Role Type Selection */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant={!useCustomRole ? "contained" : "outlined"}
                        onClick={() => setUseCustomRole(false)}
                      >
                        Hazır Şablon
                      </Button>
                      <Button
                        variant={useCustomRole ? "contained" : "outlined"}
                        onClick={() => setUseCustomRole(true)}
                      >
                        Özel Rol
                      </Button>
                    </Stack>

                    {useCustomRole ? (
                      <TextField
                        fullWidth
                        label="Özel Rol Tanımı"
                        value={customRole}
                        onChange={(e) => setCustomRole(e.target.value)}
                        placeholder="örn: Blockchain Uzmanı, Gastronomi Eleştirmeni..."
                      />
                    ) : (
                      <>
                        {/* Category Selection */}
                        <FormControl fullWidth>
                          <InputLabel>Kategori</InputLabel>
                          <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            label="Kategori"
                          >
                            {Object.entries(templateCategories).map(([key, category]) => (
                              <MenuItem key={key} value={key}>
                                {category.name} - {category.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Template Grid */}
                        <TemplateGrid container spacing={1}>
                          {getTemplatesByCategory(selectedCategory).map((template) => (
                            <Grid item xs={6} sm={4} key={template.id}>
                              <Button
                                fullWidth
                                variant={selectedTemplate?.id === template.id ? "contained" : "outlined"}
                                onClick={() => handleTemplateSelect(template)}
                                sx={{ 
                                  minHeight: 60,
                                  fontSize: '0.75rem',
                                  textAlign: 'center',
                                  whiteSpace: 'normal'
                                }}
                              >
                                {template.role}
                              </Button>
                            </Grid>
                          ))}
                        </TemplateGrid>
                      </>
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Step 2: Task & Context */}
              <Accordion expanded={expandedPanel === 'context'} onChange={() => setExpandedPanel(expandedPanel === 'context' ? false : 'context')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    2️⃣ Görev & Bağlam
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Görev Açıklaması"
                      multiline
                      rows={3}
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      placeholder="AI'nın ne yapmasını istediğinizi detaylı açıklayın..."
                    />
                    <TextField
                      fullWidth
                      label="Bağlam Bilgisi"
                      multiline
                      rows={3}
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Arka plan bilgileri, hedef kitle, kullanım amacı..."
                    />
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Step 3: Format & Style */}
              <Accordion expanded={expandedPanel === 'format'} onChange={() => setExpandedPanel(expandedPanel === 'format' ? false : 'format')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    3️⃣ Format & Stil
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Çıktı Formatı</InputLabel>
                        <Select
                          value={outputFormat}
                          onChange={(e) => setOutputFormat(e.target.value)}
                          label="Çıktı Formatı"
                        >
                          <MenuItem value="text">Metin</MenuItem>
                          <MenuItem value="markdown">Markdown</MenuItem>
                          <MenuItem value="json">JSON</MenuItem>
                          <MenuItem value="xml">XML</MenuItem>
                          <MenuItem value="table">Tablo</MenuItem>
                          <MenuItem value="list">Liste</MenuItem>
                          <MenuItem value="report">Rapor</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Ton</InputLabel>
                        <Select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          label="Ton"
                        >
                          <MenuItem value="professional">Profesyonel</MenuItem>
                          <MenuItem value="casual">Samimi</MenuItem>
                          <MenuItem value="academic">Akademik</MenuItem>
                          <MenuItem value="creative">Yaratıcı</MenuItem>
                          <MenuItem value="technical">Teknik</MenuItem>
                          <MenuItem value="friendly">Dostça</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Kısıtlamalar"
                        multiline
                        rows={2}
                        value={constraints}
                        onChange={(e) => setConstraints(e.target.value)}
                        placeholder="Uzunluk sınırı, kaçınılması gereken konular, özel gereksinimler..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Örnekler"
                        multiline
                        rows={2}
                        value={examples}
                        onChange={(e) => setExamples(e.target.value)}
                        placeholder="Beklediğiniz çıktı türüne dair örnekler..."
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Step 4: Advanced AI Techniques */}
              <Accordion expanded={expandedPanel === 'techniques'} onChange={() => setExpandedPanel(expandedPanel === 'techniques' ? false : 'techniques')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    4️⃣ Gelişmiş AI Teknikleri ({enabledTechniques.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {/* Creativity and Top-p Controls */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Yaratıcılık: {creativity}</Typography>
                        <Slider
                          value={creativity}
                          onChange={(_, value) => setCreativity(value as number)}
                          min={0}
                          max={1}
                          step={0.1}
                          marks={[
                            { value: 0, label: 'Deterministik' },
                            { value: 0.5, label: 'Dengeli' },
                            { value: 1, label: 'Yaratıcı' }
                          ]}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography gutterBottom>Top-p: {topP}</Typography>
                        <Slider
                          value={topP}
                          onChange={(_, value) => setTopP(value as number)}
                          min={0}
                          max={1}
                          step={0.1}
                          marks={[
                            { value: 0.1, label: 'Odaklanmış' },
                            { value: 0.9, label: 'Çeşitlenmiş' }
                          ]}
                        />
                      </Grid>
                    </Grid>

                    {/* AI Techniques */}
                    {Object.entries(techniqueCategories).map(([categoryKey, category]) => (
                      <Box key={categoryKey}>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: category.color, fontWeight: 'bold' }}>
                          {category.name}
                        </Typography>
                        <Grid container spacing={1}>
                          {getTechniquesByCategory(categoryKey).map((technique) => (
                            <Grid item xs={12} sm={6} key={technique.id}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={enabledTechniques.some(t => t.id === technique.id)}
                                    onChange={() => handleTechniqueToggle(technique)}
                                  />
                                }
                                label={
                                  <Tooltip title={technique.description} arrow>
                                    <Typography variant="body2">{technique.name}</Typography>
                                  </Tooltip>
                                }
                              />
                            </Grid>
                          ))}
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                      </Box>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Generated Prompt Preview */}
              {generatedPrompt && (
                <GlassCard>
                  <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                      <Typography variant="h6">
                        📝 Oluşturulan Prompt
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Tooltip title="Kopyala">
                          <IconButton onClick={copyToClipboard} size="small">
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Test Et">
                          <IconButton onClick={testPrompt} size="small" color="primary">
                            <PlayArrowIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'rgba(0, 0, 0, 0.05)', 
                        maxHeight: 300, 
                        overflow: 'auto',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.875rem',
                        lineHeight: 1.5
                      }}
                    >
                      {generatedPrompt}
                    </Paper>
                  </CardContent>
                </GlassCard>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PromptBuilder;