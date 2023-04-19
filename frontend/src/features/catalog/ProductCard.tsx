import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState } from "react";

interface Props {
    product: Product;
}


export default function ProductCard({ product }: Props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ border: '1px solid black', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                <CardHeader
                    avatar={<Avatar src={`/images/companies/${product.company}.png`} />}
                    title={product.name}
                    titleTypographyProps={{
                        sx: {
                            fontWeight: 'bold',
                            color: 'primary.main',
                            '&:hover': {
                                background: 'linear-gradient(to right, #30CFD0, #330867)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: '$glow 700ms ease-out infinite alternate'
                            }
                        }
                    }}
                />
                <CardMedia
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'text.primary', cursor: 'pointer' }}
                    image={product.pictureUrl}
                    title={product.name}
                    onClick={handleClickOpen}
                />
                <CardContent>
                    <Typography gutterBottom color='secondary' variant="h5">
                        <span
                            style={{
                                animationName: '$shine',
                                animationDuration: '1s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite'
                            }}
                        >
                            €{(product.price / 100).toFixed(2)}
                        </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.company} / {product.category}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                                boxShadow: 'none'
                            },
                            '&:active': {
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: 'error.light',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                                boxShadow: 'none'
                            },
                            '&:active': {
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Details
                    </Button>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Exit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}