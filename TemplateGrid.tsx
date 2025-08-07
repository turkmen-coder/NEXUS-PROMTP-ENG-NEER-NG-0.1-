import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  Chip,
  InputAdornment,
  Tabs,
  Tab,
  Container
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TemplateCard from './TemplateCard';

interface TemplateData {
  role: string;
  taskType: string;
  task: string;
  context: string;
  format: string;
  tone: string;
  constraints: string;
}

interface TemplateGridProps {
  templates: Record<string, TemplateData>;
  categories: Record<string, Record<string, TemplateData>>;
  onTemplateSelect: (templateId: string) => void;
  selectedTemplate?: string;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  categories,
  onTemplateSelect,
  selectedTemplate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categoryNames = Object.keys(categories);
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(templates).forEach(template => {
      tags.add(template.taskType);
      tags.add(template.tone);
      tags.add(template.format);
    });
    return Array.from(tags).sort();
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    let filtered = Object.entries(templates);

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryTemplates = categories[selectedCategory];
      filtered = filtered.filter(([id]) => id in categoryTemplates);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(([, template]) =>
        template.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.context.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(([, template]) =>
        selectedTags.some(tag =>
          template.taskType === tag ||
          template.tone === tag ||
          template.format === tag
        )
      );
    }

    return filtered;
  }, [templates, categories, selectedCategory, searchTerm, selectedTags]);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getCategoryDisplayName = (category: string) => {
    const displayNames: Record<string, string> = {
      technical: 'Teknik',
      business: 'İş Dünyası',
      education: 'Eğitim',
      creative: 'Yaratıcı',
      health: 'Sağlık',
      entertainment: 'Eğlence',
      science: 'Bilim',
      lifestyle: 'Yaşam',
      media: 'Medya'
    };
    return displayNames[category] || category;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
        AI Rol Şablonları
      </Typography>

      {/* Search and Filters */}
      <Stack spacing={3} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Rol veya görev ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Tümü" value="all" />
            {categoryNames.map(category => (
              <Tab
                key={category}
                label={getCategoryDisplayName(category)}
                value={category}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tag Filters */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Filtreler:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {allTags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagToggle(tag)}
                color={selectedTags.includes(tag) ? 'primary' : 'default'}
                variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {filteredTemplates.length} şablon bulundu
      </Typography>

      {/* Template Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {filteredTemplates.map(([templateId, template]) => (
          <TemplateCard
            key={templateId}
            templateId={templateId}
            template={template}
            onClick={onTemplateSelect}
            isSelected={selectedTemplate === templateId}
          />
        ))}
      </Box>

      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Arama kriterlerinize uygun şablon bulunamadı
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Farklı anahtar kelimeler deneyin veya filtreleri temizleyin
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TemplateGrid;