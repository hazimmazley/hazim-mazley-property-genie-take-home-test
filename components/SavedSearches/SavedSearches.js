import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  Chip,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import useSavedSearches from '@/hooks/useSavedSearches';

const SavedSearches = ({ filters, onLoadSearch }) => {
  const {
    savedSearches,
    isLoaded,
    saveSearch,
    deleteSearch,
  } = useSavedSearches();

  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchName, setSearchName] = useState('');

  const hasActiveFilters =
    filters.search ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.types.length > 0 ||
    filters.state ||
    filters.city;

  const handleSaveClick = () => {
    setSearchName('');
    setDialogOpen(true);
  };

  const handleSaveConfirm = () => {
    saveSearch(filters, searchName);
    setDialogOpen(false);
    setSearchName('');
    setExpanded(true);
  };

  const handleLoadSearch = (search) => {
    onLoadSearch(search.filters);
  };

  const formatFilterSummary = (searchFilters) => {
    const parts = [];
    if (searchFilters.search) parts.push(`"${searchFilters.search}"`);
    if (searchFilters.minPrice || searchFilters.maxPrice) {
      parts.push('Price filter');
    }
    if (searchFilters.types?.length > 0) {
      parts.push(`${searchFilters.types.length} type(s)`);
    }
    if (searchFilters.state) parts.push(searchFilters.state);
    if (searchFilters.city) parts.push(searchFilters.city);
    return parts.join(' · ') || 'No filters';
  };

  if (!isLoaded) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BookmarkIcon color="primary" fontSize="small" />
          <Typography variant="subtitle2" fontWeight={600}>
            Saved Searches
          </Typography>
          {savedSearches.length > 0 && (
            <Chip
              label={savedSearches.length}
              size="small"
              sx={{ height: 20, fontSize: 12 }}
            />
          )}
        </Box>
        {savedSearches.length > 0 && (
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<BookmarkBorderIcon />}
          onClick={handleSaveClick}
          disabled={!hasActiveFilters}
          fullWidth
        >
          Save Current Search
        </Button>
        {!hasActiveFilters && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}
          >
            Apply filters first to save a search
          </Typography>
        )}
      </Box>

      <Collapse in={expanded && savedSearches.length > 0}>
        <List dense sx={{ mt: 1 }}>
          {savedSearches.map((search) => (
            <ListItem
              key={search.id}
              button
              onClick={() => handleLoadSearch(search)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={search.name}
                secondary={formatFilterSummary(search.filters)}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500,
                }}
                secondaryTypographyProps={{
                  variant: 'caption',
                  sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  },
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearch(search.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Collapse>

      {savedSearches.length === 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', mt: 2, fontSize: 13 }}
        >
          No saved searches yet
        </Typography>
      )}

      {/* Save Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Save Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Name"
            fullWidth
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="e.g., Condos in KL under 500k"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveConfirm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default SavedSearches;
