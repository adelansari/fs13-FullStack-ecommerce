import { AppBar, Avatar, Toolbar, Typography, } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function Header() {
    return (
        <AppBar position='static' sx={{ mb: 4, bgcolor: 'warning.light' }}>
            <Toolbar>
                <Avatar
                    sx={{
                        bgcolor: deepOrange[500],
                        width: 'fit-content',
                        height: 'fit-content',
                        marginRight: 2,
                        boxShadow: '0px 0px 10px rgba(255, 152, 0, 0.5)',
                        padding: '5px',
                    }}
                    variant="square"
                >
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            margin: '0px 5px',
                        }}
                    >
                        GoShop
                    </Typography>
                </Avatar>
            </Toolbar>
        </AppBar>
    )
}