import { Box, Paper, Button, Divider, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import PriceFilter from './PriceFilter';
import PropertyTypeFilter from './PropertyTypeFilter';
import LocationFilter from './LocationFilter';

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  propertyTypes,
  states,
  cities,
}) => {
  const handlePriceChange = ({ minPrice, maxPrice }) => {
    onFilterChange({ ...filters, minPrice, maxPrice });
  };

  const handleTypesChange = (types) => {
    onFilterChange({ ...filters, types });
  };

  const handleStateChange = (state) => {
    onFilterChange({ ...filters, state, city: null });
  };

  const handleCityChange = (city) => {
    onFilterChange({ ...filters, city });
  };

  const hasActiveFilters =
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.types.length > 0 ||
    filters.state ||
    filters.city;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Filters
          </Typography>
        </Box>
        {hasActiveFilters && (
          <Button
            size="small"
            startIcon={<ClearAllIcon />}
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={handlePriceChange}
        />

        <Divider />

        <PropertyTypeFilter
          types={propertyTypes}
          selectedTypes={filters.types}
          onChange={handleTypesChange}
        />

        <Divider />

        <LocationFilter
          states={states}
          cities={cities}
          selectedState={filters.state}
          selectedCity={filters.city}
          onStateChange={handleStateChange}
          onCityChange={handleCityChange}
        />
      </Box>
    </Paper>
  );
};

export default FilterSidebar;
