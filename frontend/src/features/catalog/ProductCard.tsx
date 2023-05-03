import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography, styled } from "@mui/material";
import { Product } from "../../app/models/product";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
    product: Product;
}

const StyledDialogActions = styled(DialogActions)({
    justifyContent: "space-between",
    cursor: "pointer",
});

export default function ProductCard({ product }: Props) {
    const [open, setOpen] = useState(false);
    const { status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false); // State for modal

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ border: "1px solid black", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}>
                <CardHeader
                    avatar={<Avatar className="imageShake"src={`/images/companies/${product.company}.png`} />}
                    title={product.name}
                    titleTypographyProps={{
                        sx: {
                            fontWeight: "bold",
                            color: "primary.main",
                            "&:hover": {
                                background: "linear-gradient(to right, #30CFD0, #330867)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: "$glow 700ms ease-out infinite alternate",
                            },
                        },
                    }}
                />
                <CardMedia sx={{ height: 140, backgroundSize: "contain", bgcolor: "#9ab3b3", cursor: "pointer" }} image={product.pictureUrl} title={product.name} onClick={handleClickOpen} />
                <CardContent>
                    <Typography gutterBottom color="text.main" variant="h5">
                        <span
                            style={{
                                animationName: "$shine",
                                animationDuration: "1s",
                                animationTimingFunction: "linear",
                                animationIterationCount: "infinite",
                            }}
                        >
                            {currencyFormat(product.price)}
                        </span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        category: <b>{product.category}</b>
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <LoadingButton
                        loading={status ==="pendingAddItem" + product.id}
                        onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: "primary.dark",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "success.dark",
                                boxShadow: "none",
                            },
                            "&:active": {
                                boxShadow: "none",
                            },
                        }}
                    >
                        Add to Cart
                    </LoadingButton>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: "error.light",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "secondary.dark",
                                boxShadow: "none",
                            },
                            "&:active": {
                                boxShadow: "none",
                            },
                        }}
                        component={Link}
                        to={`/catalog/${product.id}`}
                    >
                        Details
                    </Button>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogContent style={{ backgroundColor: "#eaeaea" }}>
                    <DialogContentText onClick={handleOpenModal}>
                        <img className="imageShake" src={product.pictureUrl} alt={product.name} style={{ width: "100%", cursor: "pointer" }} />
                    </DialogContentText>
                </DialogContent>
                <StyledDialogActions>
                    <Button component={Link} to={`/catalog/${product.id}`}>
                        Details
                    </Button>
                    <Button onClick={handleClose}>Exit</Button>
                </StyledDialogActions>
            </Dialog>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    overflowY: "auto", // Enable vertical scrolling
                }}
            >
                <img src={product.pictureUrl} alt={product.name} style={{ width: "100%", cursor: "pointer" }} onClick={handleCloseModal} />
            </Modal>
        </>
    );
}
