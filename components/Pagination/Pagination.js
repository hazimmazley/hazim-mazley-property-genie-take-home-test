import { Box, Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 4,
        mb: 2,
      }}
    >
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        sx={{
          '& .MuiPaginationItem-root': {
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
