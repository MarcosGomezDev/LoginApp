import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div>
        <Typography
          sx={{ marginBottom: "50px" }}
          gutterBottom
          variant="h5"
          component="h2"
        >
          Error 404
        </Typography>
        <Typography sx={{ marginBottom: "50px" }}>
          Esta página no existe
        </Typography>
        <Button variant="contained" onClick={goLogin}>
          Volver a login
        </Button>
      </div>
    </Box>
  );
};
