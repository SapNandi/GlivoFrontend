import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashBoardCard = ({ item, isAuthenticated }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/myProduct/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={isAuthenticated ? item.bgImage && item.bgImage.url : "/Profile.png"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {isAuthenticated ? item && item.name : ""}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isAuthenticated ? item && item.description : ""}
        </Typography>
      </CardContent>
      <Link></Link>
      <CardActions
        onClick={() => {
          handleClick(item && item._id);
        }}
      >
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default DashBoardCard;
