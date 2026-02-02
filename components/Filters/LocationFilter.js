import { Box, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const LocationFilter = ({
  states,
  cities,
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom fontWeight={600}>
        Location
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="state-select-label">State</InputLabel>
          <Select
            labelId="state-select-label"
            value={selectedState || ''}
            label="State"
            onChange={(e) => onStateChange(e.target.value || null)}
          >
            <MenuItem value="">
              <em>All States</em>
            </MenuItem>
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" fullWidth>
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            value={selectedCity || ''}
            label="City"
            onChange={(e) => onCityChange(e.target.value || null)}
          >
            <MenuItem value="">
              <em>All Cities</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default LocationFilter;
