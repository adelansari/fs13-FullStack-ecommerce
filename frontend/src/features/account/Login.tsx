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
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.login(data);
        } catch (error) {
            console.log(error);
        }
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
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                    <TextField color="warning" margin="normal" fullWidth label="Username" autoComplete="username" autoFocus {...register("username", { required: "Please input a username." })} error={!!errors.username} helperText={errors?.username?.message as string} />
                    <TextField
                        color="warning"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        {...register("password", { required: "Please input a password." })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                        
                    />
                    <LoadingButton loading={isSubmitting} disabled={!isValid} color="warning" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </LoadingButton>
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
