import {
  Card,
  CardContent,
  CardMedia,
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
import styled from 'styled-components';
import { formatPrice, formatSize, formatPropertyType } from '@/utils/formatters';

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PropertyImage = styled(CardMedia)`
  height: 200px;
  object-fit: cover;
`;

const PriceTag = styled(Box)`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(25, 118, 210, 0.95);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
`;

const CategoryChip = styled(Chip)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

const FeatureItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => props.theme.palette.text.secondary};
`;

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
    <StyledCard>
      <Box sx={{ position: 'relative' }}>
        <PropertyImage
          component="img"
          image={image || '/placeholder-property.jpg'}
          alt={name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        <CategoryChip
          label={categoryLabel}
          color={categoryColor}
          size="small"
        />
        <PriceTag>{formatPrice(price)}</PriceTag>
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
          }}
        >
          {bedRooms !== null && (
            <FeatureItem>
              <BedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{bedRooms} Beds</Typography>
            </FeatureItem>
          )}
          {bathRooms !== null && (
            <FeatureItem>
              <BathtubIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{bathRooms} Baths</Typography>
            </FeatureItem>
          )}
          {floorSize && (
            <FeatureItem>
              <SquareFootIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">{formatSize(floorSize)}</Typography>
            </FeatureItem>
          )}
        </Box>

        {furnishings && (
          <Chip
            label={furnishings}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              mb: 1.5,
              backgroundColor: 'grey.100',
            }}
          />
        )}

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
    </StyledCard>
  );
};

export default PropertyCard;
