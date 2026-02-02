import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { formatPropertyType } from '@/utils/formatters';

const PropertyTypeFilter = ({ types, selectedTypes, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (type) => {
    const newSelected = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    onChange(selectedTypes.length === types.length ? [] : [...types]);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Property Type
        </Typography>
        <IconButton size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <FormGroup sx={{ mt: 1, maxHeight: 250, overflowY: 'auto' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedTypes.length === types.length && types.length > 0}
                indeterminate={
                  selectedTypes.length > 0 && selectedTypes.length < types.length
                }
                onChange={handleSelectAll}
                size="small"
              />
            }
            label={
              <Typography variant="body2" fontWeight={500}>
                All Types
              </Typography>
            }
          />
          {types.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleChange(type)}
                  size="small"
                />
              }
              label={
                <Typography variant="body2">
                  {formatPropertyType(type)}
                </Typography>
              }
              sx={{ ml: 1 }}
            />
          ))}
        </FormGroup>
      </Collapse>
    </Box>
  );
};

export default PropertyTypeFilter;
