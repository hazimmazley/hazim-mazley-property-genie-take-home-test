import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SORT_OPTIONS = [
  { value: '', label: 'Default (Latest)' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
];

const SortSelect = ({ value, onChange }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortSelect;
