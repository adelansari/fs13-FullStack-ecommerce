import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, styled } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}

const StyledDialogActions = styled(DialogActions)({
    justifyContent: 'space-between',
});

export default function ProductCard({ product }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // const {setBasket} = useStoreContext();

    function handleAddItem(productId: number, quantity = 1) {
        setLoading(true);
        agent.Basket.addItem(productId, quantity)
            // .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    };

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
                    sx={{ height: 140, backgroundSize: 'contain', bgcolor: '#9ab3b3', cursor: 'pointer' }}
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
                    <LoadingButton
                        loading={loading}
                        onClick={() => handleAddItem(product.id)} 
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: 'primary.dark',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'success.dark',
                                boxShadow: 'none'
                            },
                            '&:active': {
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Add to Cart
                    </LoadingButton>
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
                        component={Link} to={`/catalog/${product.id}`}
                    >
                        Details
                    </Button>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent style={{ backgroundColor: '#eaeaea' }}>
                    <DialogContentText>
                        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
                    </DialogContentText>
                </DialogContent>
                <StyledDialogActions>
                    <Button component={Link} to={`/catalog/${product.id}`}>
                        Details
                    </Button>
                    <Button onClick={handleClose}>Exit</Button>
                </StyledDialogActions>
            </Dialog>
        </>
    )
}