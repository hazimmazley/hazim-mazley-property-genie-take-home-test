import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Drawer,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Header } from '@/components/Layout';
import { PropertyCard, PropertyCardSkeleton } from '@/components/PropertyCard';
import { FilterSidebar, SearchInput } from '@/components/Filters';
import { SortSelect } from '@/components/Sort';
import { Pagination } from '@/components/Pagination';
import { SavedSearches } from '@/components/SavedSearches';
import useProperties from '@/hooks/useProperties';
import { applyFilters, getUniqueValues, getCitiesForState, paginate } from '@/utils/filters';

const ITEMS_PER_PAGE = 12;

const DEFAULT_FILTERS = {
  search: '',
  minPrice: null,
  maxPrice: null,
  types: [],
  state: null,
  city: null,
};

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const isInitialMount = useRef(true);

  const { properties, isLoading, isError } = useProperties(sort);

  // Show brief loading state when filters or page change (not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only show filtering state if we have data loaded
    if (properties.length > 0) {
      setIsFiltering(true);
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [filters, page, properties.length]);

  // Sync URL params with state on mount
  useEffect(() => {
    if (router.isReady) {
      const { sort: urlSort, page: urlPage, ...urlFilters } = router.query;

      if (urlSort) setSort(urlSort);
      if (urlPage) setPage(Number(urlPage));

      const newFilters = { ...DEFAULT_FILTERS };
      if (urlFilters.search) newFilters.search = urlFilters.search;
      if (urlFilters.minPrice) newFilters.minPrice = Number(urlFilters.minPrice);
      if (urlFilters.maxPrice) newFilters.maxPrice = Number(urlFilters.maxPrice);
      if (urlFilters.types) {
        newFilters.types = Array.isArray(urlFilters.types)
          ? urlFilters.types
          : [urlFilters.types];
      }
      if (urlFilters.state) newFilters.state = urlFilters.state;
      if (urlFilters.city) newFilters.city = urlFilters.city;

      setFilters(newFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters, newSort, newPage) => {
      const query = {};

      if (newSort) query.sort = newSort;
      if (newPage > 1) query.page = newPage;
      if (newFilters.search) query.search = newFilters.search;
      if (newFilters.minPrice !== null) query.minPrice = newFilters.minPrice;
      if (newFilters.maxPrice !== null) query.maxPrice = newFilters.maxPrice;
      if (newFilters.types.length > 0) query.types = newFilters.types;
      if (newFilters.state) query.state = newFilters.state;
      if (newFilters.city) query.city = newFilters.city;

      router.push({ pathname: '/', query }, undefined, { shallow: true });
    },
    [router]
  );

  // Get unique values for filters
  const propertyTypes = useMemo(
    () => getUniqueValues(properties, 'type'),
    [properties]
  );

  const states = useMemo(
    () => getUniqueValues(properties, 'state'),
    [properties]
  );

  const cities = useMemo(
    () => getCitiesForState(properties, filters.state),
    [properties, filters.state]
  );

  // Apply filters and pagination
  const filteredProperties = useMemo(
    () => applyFilters(properties, filters),
    [properties, filters]
  );

  const paginatedData = useMemo(
    () => paginate(filteredProperties, page, ITEMS_PER_PAGE),
    [filteredProperties, page]
  );

  // Event handlers
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
    updateURL(filters, newSort, 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    updateURL(newFilters, sort, 1);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    updateURL(DEFAULT_FILTERS, sort, 1);
  };

  const handleSearchChange = (value) => {
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    setPage(1);
    updateURL(newFilters, sort, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateURL(filters, sort, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadSearch = (savedFilters) => {
    setFilters(savedFilters);
    setPage(1);
    updateURL(savedFilters, sort, 1);
    if (isMobile) setDrawerOpen(false);
  };

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.types.length > 0) count++;
    if (filters.state || filters.city) count++;
    return count;
  }, [filters]);

  const filterSidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        propertyTypes={propertyTypes}
        states={states}
        cities={cities}
      />
      <SavedSearches filters={filters} onLoadSearch={handleLoadSearch} />
    </Box>
  );

  return (
    <>
      <Head>
        <title>Property Genie - Find Your Dream Property</title>
        <meta
          name="description"
          content="Search and discover properties for sale and rent in Malaysia"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', overflow: 'visible' }}>
        <Header
          showMenuButton={true}
          onMenuClick={() => setDrawerOpen(true)}
        />

        <Container maxWidth="xl" sx={{ py: 3, overflow: 'visible' }}>
          {/* Page Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              Property Listings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="body1" color="text.secondary">
                {isLoading
                  ? 'Loading properties...'
                  : `${filteredProperties.length} properties found`}
              </Typography>
              {activeFilterCount > 0 && (
                <Chip
                  label={`${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active`}
                  color="primary"
                  size="small"
                  onDelete={handleClearFilters}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* Filter Sidebar - Desktop */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                width: 280,
                flexShrink: 0,
                alignSelf: 'stretch',
              }}
            >
              <Box
                sx={{
                  position: 'sticky',
                  top: 80,
                }}
              >
                {filterSidebarContent}
              </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Search and Sort Bar */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3,
                  gap: 2,
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                }}
              >
                <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 } }}>
                  <SearchInput
                    value={filters.search}
                    onChange={handleSearchChange}
                    placeholder="Search by property name or address..."
                  />
                </Box>
                <SortSelect value={sort} onChange={handleSortChange} />
              </Box>

              {/* Error State */}
              {isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Failed to load properties. Please try again later.
                </Alert>
              )}

              {/* Property Grid */}
              <Grid container spacing={3}>
                {isLoading || isFiltering
                  ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                      <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                        <PropertyCardSkeleton />
                      </Grid>
                    ))
                  : paginatedData.items.map((property) => (
                      <Grid item xs={12} sm={6} md={4} xl={3} key={property.id}>
                        <PropertyCard property={property} />
                      </Grid>
                    ))}
              </Grid>

              {/* No Results */}
              {!isLoading && !isFiltering && filteredProperties.length === 0 && (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    No properties found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search criteria
                  </Typography>
                </Box>
              )}

              {/* Pagination */}
              {!isLoading && !isFiltering && filteredProperties.length > 0 && (
                <Pagination
                  page={paginatedData._meta.currentPage}
                  totalPages={paginatedData._meta.pageCount}
                  onPageChange={handlePageChange}
                />
              )}
            </Box>
          </Box>
        </Container>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: '85%',
              maxWidth: 360,
              p: 2,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              flexShrink: 0,
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ overflowY: 'auto', flex: 1 }}>
            {filterSidebarContent}
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
