import React, { FC } from "react";
import { ICategoryResponse } from "../../../types/category";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Menu,
  // MenuItem,
  Typography,
} from "@mui/material";
import CategoryDeletePopup from "../CategoryDeletePopup/CategoryDeletePopup";
import CategoryEditPopup from "../CategoryEditPopup/CategoryEditPopup";
import { useNavigate } from "react-router-dom";

interface ICategoryItemProps {
  category: ICategoryResponse;
}
const CategoryItem: FC<ICategoryItemProps> = ({ category }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleNewPage = () => {
    navigate(`${category.id}/tasks`);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card
          sx={{
            maxWidth: 345,
            overflow: "visible",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                  backgroundColor: "primary.light",
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "secondary.dark",
                }}
              >
                {dayjs(category.dateCreated).format("DD.MM.YYYY")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ p: "16px" }}>
            <Button
              id="basic-button"
              // variant="outlined"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              sx={{
                fontWeight: 700,
                fontSize: "1.002rem",
                lineHeight: "1.75",
              }}
              onClick={handleClick}
            >
              actions
            </Button>

            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ px: "0.5rem" }}
            >
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <CategoryEditPopup category={category} />
                <CategoryDeletePopup id={category.id} />
              </Menu>
            </Box>

            <Button
              type="button"
              // variant="outlined"
              sx={{
                fontWeight: 700,
                fontSize: "1.002rem",
                lineHeight: "1.75",
                // "& .MuiButtonBase-root-MuiButton-root": {
                //   ml: "0px",
                // },
              }}
              onClick={handleNewPage}
            >
              more
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CategoryItem;
