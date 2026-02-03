import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { formatPrice, formatSize, formatPropertyType } from '@/utils/formatters';

const PropertyCard = ({ property }) => {
  const {
    name,
    type,
    category,
    image,
    bedRooms,
    bathRooms,
    floorSize,
    landSize,
    address,
    price,
    account,
    state,
    city,
    furnishings,
  } = property;

  const categoryColor = category === 'sale' ? 'success' : 'primary';
  const categoryLabel = category === 'sale' ? 'For Sale' : 'For Rent';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 180,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={image || '/placeholder-property.jpg'}
          alt={name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Chip
          label={categoryLabel}
          color={categoryColor}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            bgcolor: 'rgba(25, 118, 210, 0.95)',
            color: 'white',
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '1.1rem',
          }}
        >
          {formatPrice(price)}
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.3,
            minHeight: '2.6em',
          }}
        >
          {name}
        </Typography>

        <Chip
          label={formatPropertyType(type)}
          size="small"
          variant="outlined"
          sx={{ alignSelf: 'flex-start', mb: 1.5 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
          <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {city}, {state}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 1.5,
            flexWrap: 'wrap',
            minHeight: 24,
          }}
        >
          {bedRooms !== null && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <BedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{bedRooms} Beds</Typography>
            </Box>
          )}
          {bathRooms !== null && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <BathtubIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{bathRooms} Baths</Typography>
            </Box>
          )}
          {floorSize && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <SquareFootIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{formatSize(floorSize)}</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ minHeight: 32, mb: 1.5 }}>
          {furnishings && (
            <Chip
              label={furnishings}
              size="small"
              sx={{
                backgroundColor: 'grey.100',
              }}
            />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              bgcolor: 'primary.main',
            }}
          >
            {account?.name?.charAt(0) || 'A'}
          </Avatar>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {account?.name || 'Agent'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
