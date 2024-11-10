import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Material UI components
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";

// Material UI icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CategoryIcon from "@mui/icons-material/Category";

// Custom modules
import useCategoriesStore from "../store/categoriesStore";
import { getCategory } from "../API/GetCategory";

const Header: React.FC = () => {
  const { categories, setCategories } = useCategoriesStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          My Shop
        </Typography>
        <Box>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            component={Link}
            to="/"
            sx={{ textTransform: "none", mx: 1 }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            startIcon={<InfoIcon />}
            component={Link}
            to="/about"
            sx={{ textTransform: "none", mx: 1 }}
          >
            About
          </Button>
          <Button
            color="inherit"
            startIcon={<CategoryIcon />}
            onClick={handleMenuClick}
            sx={{ textTransform: "none", mx: 1 }}
          >
            Categories
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: 3,
                borderRadius: 2,
              },
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.slug}
                onClick={handleMenuClose}
                component={Link}
                to={`/category/${category.slug}`}
              >
                {category.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
