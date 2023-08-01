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
  Link,
  Menu,
  // MenuItem,
  Typography,
} from "@mui/material";
import CategoryDeletePopup from "../CategoryDeletePopup/CategoryDeletePopup";
import CategoryEditPopup from "../CategoryEditPopup/CategoryEditPopup";

interface ICategoryItemProps {
  category: ICategoryResponse;
}
const CategoryItem: FC<ICategoryItemProps> = ({ category }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
            border: "1px solid #2363eb",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" sx={{ mt: "1rem" }}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {category.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  color: "#ffa238",
                }}
              >
                {dayjs(category.dateCreated).format("DD.MM.YYYY")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              id="basic-button"
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

            <Link href="tasks" underline="none">
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.002rem",
                  lineHeight: "1.75",
                  textTransform: "uppercase",
                }}
              >
                more
              </Typography>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default CategoryItem;
