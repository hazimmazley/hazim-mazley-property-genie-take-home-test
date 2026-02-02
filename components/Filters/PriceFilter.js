import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Collapse,
} from '@mui/material';

const PRICE_PRESETS = [
  { label: 'Any', min: null, max: null },
  { label: '< 500K', min: null, max: 500000 },
  { label: '500K - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: '2M - 5M', min: 2000000, max: 5000000 },
  { label: '5M+', min: 5000000, max: null },
];

const MIN_OPTIONS = [
  { value: '', label: 'No Min' },
  { value: 100000, label: 'RM 100K' },
  { value: 200000, label: 'RM 200K' },
  { value: 300000, label: 'RM 300K' },
  { value: 400000, label: 'RM 400K' },
  { value: 500000, label: 'RM 500K' },
  { value: 750000, label: 'RM 750K' },
  { value: 1000000, label: 'RM 1M' },
  { value: 1500000, label: 'RM 1.5M' },
  { value: 2000000, label: 'RM 2M' },
  { value: 3000000, label: 'RM 3M' },
  { value: 5000000, label: 'RM 5M' },
];

const MAX_OPTIONS = [
  { value: '', label: 'No Max' },
  { value: 200000, label: 'RM 200K' },
  { value: 300000, label: 'RM 300K' },
  { value: 400000, label: 'RM 400K' },
  { value: 500000, label: 'RM 500K' },
  { value: 750000, label: 'RM 750K' },
  { value: 1000000, label: 'RM 1M' },
  { value: 1500000, label: 'RM 1.5M' },
  { value: 2000000, label: 'RM 2M' },
  { value: 3000000, label: 'RM 3M' },
  { value: 5000000, label: 'RM 5M' },
  { value: 10000000, label: 'RM 10M' },
];

const PriceFilter = ({ minPrice, maxPrice, onChange }) => {
  const [showCustom, setShowCustom] = useState(false);

  // Check if current values match a preset
  const getActivePreset = () => {
    const preset = PRICE_PRESETS.find(
      (p) => p.min === minPrice && p.max === maxPrice
    );
    return preset ? preset.label : null;
  };

  const activePreset = getActivePreset();

  // Show custom if values don't match any preset
  useEffect(() => {
    if (minPrice !== null || maxPrice !== null) {
      if (!activePreset) {
        setShowCustom(true);
      }
    }
  }, [minPrice, maxPrice, activePreset]);

  const handlePresetClick = (preset) => {
    if (preset.label === 'Any') {
      setShowCustom(false);
    }
    onChange({ minPrice: preset.min, maxPrice: preset.max });
  };

  const handleCustomClick = () => {
    setShowCustom(true);
  };

  const handleMinChange = (e) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    onChange({ minPrice: value, maxPrice });
  };

  const handleMaxChange = (e) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    onChange({ minPrice, maxPrice: value });
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom fontWeight={600}>
        Price Range
      </Typography>

      {/* Preset Chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
        {PRICE_PRESETS.map((preset) => (
          <Chip
            key={preset.label}
            label={preset.label}
            size="small"
            variant={activePreset === preset.label ? 'filled' : 'outlined'}
            color={activePreset === preset.label ? 'primary' : 'default'}
            onClick={() => handlePresetClick(preset)}
            sx={{
              fontWeight: activePreset === preset.label ? 600 : 400,
              cursor: 'pointer',
            }}
          />
        ))}
        <Chip
          label="Custom"
          size="small"
          variant={showCustom && !activePreset ? 'filled' : 'outlined'}
          color={showCustom && !activePreset ? 'primary' : 'default'}
          onClick={handleCustomClick}
          sx={{
            fontWeight: showCustom && !activePreset ? 600 : 400,
            cursor: 'pointer',
          }}
        />
      </Box>

      {/* Custom Range Dropdowns */}
      <Collapse in={showCustom}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <Select
              value={minPrice ?? ''}
              onChange={handleMinChange}
              displayEmpty
            >
              {MIN_OPTIONS.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography color="text.secondary" sx={{ px: 0.5 }}>
            to
          </Typography>

          <FormControl size="small" sx={{ flex: 1 }}>
            <Select
              value={maxPrice ?? ''}
              onChange={handleMaxChange}
              displayEmpty
            >
              {MAX_OPTIONS.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Collapse>

      {/* Show current selection summary */}
      {(minPrice !== null || maxPrice !== null) && !activePreset && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {minPrice && maxPrice
            ? `RM ${(minPrice / 1000).toFixed(0)}K - RM ${(maxPrice / 1000).toFixed(0)}K`
            : minPrice
            ? `From RM ${(minPrice / 1000).toFixed(0)}K`
            : `Up to RM ${(maxPrice / 1000).toFixed(0)}K`}
        </Typography>
      )}
    </Box>
  );
};

export default PriceFilter;
