import { Box, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { LoadingButton } from "@mui/lab";


const ProductImage = styled("img")({
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
});

const ProductInfo = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        order: -1,
    },
}));

const NeonTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 2px ${theme.palette.primary.main}, 0 0 4px ${theme.palette.secondary.main}, 0 0 6px ${theme.palette.primary.main}, 0 0 8px ${theme.palette.primary.main}`,
}));

const NeonTableCell = styled(TableCell)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
}));

const BoldNeonTableCell = styled(NeonTableCell)({
    fontWeight: "bold",
});

export default function ProductDetails() {
    const { basket, status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector((state) => productSelectors.selectById(state, id!));
    const { status: productStatus } = useAppSelector((state) => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find((i) => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, product, dispatch]);

    function handleInputChange(e: any) {
        if (e.target.value >= 0) setQuantity(parseInt(e.target.value));
    }

    function handleUpdateCart() {
        if (!item || quantity > item?.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
        }
    }

    if (productStatus.includes("pending")) return <LoadingComponent message="Loading product..." />;

    if (!product) return <NotFound />;

    return (
        <Grid container spacing={6} alignItems="center">
            <ProductInfo item xs={12} md={6}>
                <NeonTableContainer>
                    <Box marginX={2}>
                        <Box marginBottom={2} />
                        <Table>
                            <TableBody sx={{ fontSize: "1.1em" }}>
                                <TableRow>
                                    <NeonTableCell colSpan={2}>
                                        <Typography variant="h3">{product.name}</Typography>
                                        <Divider sx={{ mb: 2 }} />
                                        <Typography variant="h4" color="secondary">
                                            €{(product.price / 100).toFixed(2)}
                                        </Typography>
                                    </NeonTableCell>
                                </TableRow>
                                <TableRow>
                                    <BoldNeonTableCell>Name</BoldNeonTableCell>
                                    <NeonTableCell>{product.name}</NeonTableCell>
                                </TableRow>
                                <TableRow>
                                    <BoldNeonTableCell>Description</BoldNeonTableCell>
                                    <NeonTableCell>{product.description}</NeonTableCell>
                                </TableRow>
                                <TableRow>
                                    <BoldNeonTableCell>Category</BoldNeonTableCell>
                                    <NeonTableCell>{product.category}</NeonTableCell>
                                </TableRow>
                                <TableRow>
                                    <BoldNeonTableCell>Company</BoldNeonTableCell>
                                    <NeonTableCell>{product.company}</NeonTableCell>
                                </TableRow>
                                <TableRow>
                                    <BoldNeonTableCell>Remaining</BoldNeonTableCell>
                                    <NeonTableCell>{product.quantityRemains}</NeonTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {/* Add spacing above TextField and LoadingButton */}
                        <Box marginBottom={2} />
                        <Grid container>
                            <Grid item xs={6}>
                                <TextField onChange={handleInputChange} variant={"outlined"} type={"number"} label={"Quantity in Cart"} fullWidth value={quantity} />
                            </Grid>
                            <Grid item xs={6}>
                                <LoadingButton
                                    disabled={item?.quantity === quantity || (!item && quantity === 0)}
                                    loading={status.includes("pending")}
                                    onClick={handleUpdateCart}
                                    sx={{ height: "55px" }}
                                    color={"warning"}
                                    size={"large"}
                                    variant={"contained"}
                                    fullWidth
                                >
                                    {item ? "Update Quantity" : "Add to Cart"}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                        <Box marginBottom={2} />
                    </Box>
                </NeonTableContainer>
            </ProductInfo>
            <Grid item xs={12} md={6}>
                <ProductImage src={product.pictureUrl} alt={product.name} />
            </Grid>
        </Grid>
    );
}
