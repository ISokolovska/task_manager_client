import React, { FC, useEffect } from "react";
import { ICategoryResponse } from "../../../types/category";
import { useDeleteCategoryMutation } from "../../../redux/api/categoryApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

interface ICategoryItemProps {
  category: ICategoryResponse;
}
const CategoryItem: FC<ICategoryItemProps> = ({ category }) => {
  // const [openPostModal, setOpenPostModal] = useState(false);
  const [deleteCategory, { isLoading, isSuccess, isError }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post deleted successfully");
    }

    if (isError) {
      toast.success("Sorry, we have some problem (Post)");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess, isError]);

  const onDeleteHandler = (id: number) => {
    if (window.confirm("Are you sure")) {
      deleteCategory(id);
    }
  };
  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ maxWidth: 345, overflow: "visible" }}>
          <CardContent>
            {/* <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#4d4d4d", fontWeight: "bold", height: "64px" }}
            >
              {post.title.length > 50
                ? post.title.substring(0, 50) + "..."
                : post.title}
            </Typography> */}
            <Box display="flex" alignItems="center" sx={{ mt: "1rem" }}>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >
                {category.name}
              </Typography>
              {/* <Typography
                variant="body1"
                sx={{
                  backgroundColor: "#dad8d8",
                  p: "0.1rem 0.4rem",
                  borderRadius: 1,
                  mr: "1rem",
                }}
              >.
                {category.name}
              </Typography> */}
              <Typography
                variant="body2"
                sx={{
                  color: "#ffa238",
                }}
              >
                {dayjs(category.dateCreated).format("DD.MM.YYYY")}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              sx={{ px: "0.5rem" }}
            >
              <div className="post-settings">
                <ul className="menu">
                  {/* <li onClick={() => setOpenPostModal(true)}>Edit</li> */}
                  <li onClick={() => onDeleteHandler(category.id)}>Delete</li>
                </ul>
              </div>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      {/* <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      >
        <UpdatePost setOpenPostModal={setOpenPostModal} post={post} />
      </PostModal> */}
    </>
  );
};

export default CategoryItem;
