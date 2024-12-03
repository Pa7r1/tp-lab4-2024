import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardComponent = () => {
  const precio = 1000;
  const titulo = "Titulo";
  return (
    <Card
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://via.placeholder.com/200"
          height="200"
        />
        <CardContent>
          <Typography variant="h3"> {titulo} </Typography>
          <Typography variant="h6"> {precio} </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button variant="contained">COMPRAR</Button>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
