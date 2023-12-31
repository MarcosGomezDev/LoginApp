import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/data/userSlice";
import { User } from "../types/userType";
import { useEffect, useState } from "react";
import { addData } from "../redux/data/dataSlice";
import { Data } from "../types/dataType";
import Pagination from "@mui/material/Pagination";
import { CircularProgress, TextField } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Logout() {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data: Data = useSelector((state: any) => state.data);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const url: string = `https://reqres.in/api/users?page=${page}`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch(addData(json));
        setTimeout(() => setLoading(false), 100);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const searcher = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? data.data
    : data.data.filter((user: User) =>
        user.first_name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <TextField
            margin="normal"
            id="outlined-basic"
            label="Search"
            name="search"
            autoComplete="search"
            color="secondary"
            value={search}
            onChange={searcher}
          />
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Users List
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {results.map((user: User) => (
                <Grid item key={user.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "100%",
                      }}
                      image={user.avatar}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.first_name} {user.last_name}
                      </Typography>
                      <Typography>{user.email}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "50px",
                }}
              >
                <Pagination
                  variant="outlined"
                  color="primary"
                  count={data.total_pages}
                  page={page}
                  onChange={handleChange}
                  sx={{ mb: 3 }}
                  size="large"
                />
              </Box>
            </Grid>
          )}
        </Container>
      </main>
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Marcos Gomez Medina
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}
