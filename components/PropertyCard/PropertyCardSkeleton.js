import { Card, CardContent, Box, Skeleton } from '@mui/material';

const PropertyCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={200} />

      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 1 }} />
        <Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '60%', mb: 1 }} />

        <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1.5 }} />

        <Skeleton variant="text" sx={{ width: '70%', mb: 1.5 }} />

        <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={60} />
          <Skeleton variant="text" width={80} />
        </Box>

        <Box sx={{ mt: 2 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={100} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCardSkeleton;
