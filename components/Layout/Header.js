import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import styled from 'styled-components';

const Logo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Header = ({ onMenuClick, showMenuButton = false }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
      }}
    >
      <Toolbar>
        {showMenuButton && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Logo>
          <HomeIcon sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: '-0.5px',
            }}
          >
            PropertyGenie
          </Typography>
        </Logo>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="body2"
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'text.secondary',
          }}
        >
          Find Your Dream Property
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
