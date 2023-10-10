import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
import { User } from "../Types/userType";
import { useEffect, useState } from "react";
import { addData } from "../redux/data/dataSlice";
import { Data } from "../Types/dataType";
// import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { Pagination } from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data: Data = useSelector((state: any) => state.data);

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const userList = (pag: number) => {
    const url: string = `https://reqres.in/api/users?page=${pag}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch(addData(json));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    userList(currentPage);
  }, [currentPage]);

  // const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
  //   setPage(value);
  // };

  // React.useEffect(() => {
  //   setLoading(true);
  //   characters
  //     .getAll({ page })
  //     .then((r) => {
  //       setCount(r.data.info.pages);
  //       setAllCharacters(r.data.results);

  //       setTimeout(() => setLoading(false), 1000);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, [page]);

  // useEffect(() => {
  //   const url: string = `https://reqres.in/api/users?page=${page}`;
  //   setLoading(true);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       dispatch(addData(json));
  //       setCount(data.total_pages);
  //       console.log(count);
  //       setTimeout(() => setLoading(false), 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   const url: string = `https://reqres.in/api/users?page=${page}`;
  //   setLoading(true);
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       dispatch(addData(json));
  //       setCount(data.total_pages);
  //       console.log(count);
  //       setTimeout(() => setLoading(false), 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [page]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar></Toolbar>
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
          <Grid container spacing={4}>
            {data?.data?.map((user: User) => (
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
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Pagination
                userPerPage={6}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalUsers={data?.total || 0}
              />

              {/* <Pagination
                variant="outlined"
                color="primary"
                count={2}
                page={page}
                onChange={handleChange}
                sx={{ mb: 3 }}
                size="large"
              /> */}
            </Box>
          </Grid>
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
