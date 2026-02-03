import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { formatPropertyType } from '@/utils/formatters';

const PropertyTypeFilter = ({ types, selectedTypes, onChange }) => {
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
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
        Property Type
      </Typography>

      <FormGroup sx={{ maxHeight: 250, overflowY: 'auto' }}>
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
    </Box>
  );
};

export default PropertyTypeFilter;
