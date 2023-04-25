import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = (event:any) => {
        event.preventDefault();
        agent.Account.login(values);
    };

    function handleInputChange(event: any) {
        const {name, value} = event.target;
        setValues({...values, [name]:value});
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component={Paper} elevation={3} maxWidth="sm" sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "warning.dark" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField color="warning" margin="normal" fullWidth  label="Username" name="username" autoComplete="username" autoFocus onChange={handleInputChange} value={values.username}/>
                    <TextField color="warning" margin="normal" fullWidth name="password" label="Password" type="password" autoComplete="current-password" onChange={handleInputChange} value={values.password} />
                    <Button color="warning" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
