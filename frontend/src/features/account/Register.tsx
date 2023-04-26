import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting, errors, isValid },
    } = useForm({
        mode: "onTouched",
    });

    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string, index: number) => {
                if (error.includes("Password")) {
                    setError("password", { message: error });
                } else if (error.includes("Username")) {
                    setError("username", { message: error });
                } else if (error.includes("Email")) {
                    setError("email", { message: error });
                }
            });
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
                    Sign Up
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) =>
                        agent.Account.register(data)
                            .then(() => {
                                toast.success("Sign up complete. Feel free to login now!");
                                navigate("/login");
                            })
                            .catch((error) => handleApiErrors(error))
                    )}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        color="warning"
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoComplete="username"
                        autoFocus
                        {...register("username", { required: "Please input a username." })}
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                    />
                    <TextField
                        color="warning"
                        margin="normal"
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Please input a email.",
                            pattern: {
                                value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                                message: "The email address you have entered is not valid!",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
                    />
                    <TextField
                        color="warning"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Please input a password.",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                                message: "Please use a stronger password!",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                    />
                    <LoadingButton loading={isSubmitting} disabled={!isValid} color="warning" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to="/login">{"You already have an account? Sign In!"}</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
