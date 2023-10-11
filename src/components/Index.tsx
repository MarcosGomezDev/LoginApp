import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme();

export const Index = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <Box>
          <Typography
            sx={{ marginBottom: "50px" }}
            gutterBottom
            variant="h3"
            component="h2"
          >
            Go Login: Press Button
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <Button variant="contained" onClick={goLogin}>
              LOGIN
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
