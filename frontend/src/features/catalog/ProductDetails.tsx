import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import { LoadingButton } from "@mui/lab";
import { createGlobalStyle } from "styled-components";
import AnimatedTypography from "./AnimatedTypography";

// // Product image component if I am not using the cube:
// const ProductImage = styled("img")({
//     maxWidth: "100%",
//     maxHeight: "100%",
//     objectFit: "contain",
// });

const ProductInfo = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        order: -1,
    },
}));

const NeonTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: `0 0 2px ${theme.palette.primary.main}, 0 0 4px ${theme.palette.warning.main}, 0 0 6px ${theme.palette.primary.main}, 0 0 8px ${theme.palette.primary.main}`,
}));

const NeonTableCell = styled(TableCell)(({ theme }) => ({
    border: `1px solid ${theme.palette.primary.main}`,
}));

const BoldNeonTableCell = styled(NeonTableCell)({
    fontWeight: "bold",
});

// creating a 3D cube container so wrap the product image inside:
const CubeContainer = styled("div")({
    // perspective: "1000px",
    // perspectiveOrigin: "180% 100%",
    width: "300px",
    height: "300px",
    position: "relative",
    transformStyle: "preserve-3d",
    animation: "spin 20s infinite linear",
    cursor: "pointer",
});

const CubeFace = styled("div")(({ theme }) => ({
    position: "absolute",
    width: "300px",
    height: "300px",
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "10px",
    backdropFilter: "blur(10px)", // Gives the glass effect
    boxSizing: "border-box",
}));

const CubeImage = styled("img")({
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: "10px",
});

const faces = [
    "rotateX(-90deg) translateZ(150px)",
    "rotateY(90deg) translateZ(150px)",
    "rotateY(180deg) translateZ(150px)",
    "rotateY(-90deg) translateZ(150px)",
    "rotateX(0deg) translateZ(150px)",
    "rotateX(90deg) translateZ(150px)",
];

const GlobalStyle = createGlobalStyle`
    @keyframes spin {
        from {
            transform:  rotateZ(0deg) rotateY(0deg);
        }
        to {
            transform:  rotateZ(-1turn) rotateY(-1turn);
        }
    }
`;

const StyledDialogActions = styled(DialogActions)({
    justifyContent: "space-between",
    cursor: "pointer",
});

export default function ProductDetails() {
    const { basket, status } = useAppSelector((state) => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector((state) => productSelectors.selectById(state, id!));
    const { status: productStatus } = useAppSelector((state) => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find((i) => i.productId === product?.id);
    const [open, setOpen] = useState(false); // for image click event
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

    // For the 3D cube:
    const cubeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cubeRef.current) {
            const cubeFaces = Array.from(cubeRef.current.children) as HTMLElement[];
            cubeFaces.forEach((face, i) => {
                face.style.transform = faces[i];
            });
        }
    }, []);

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
        <>
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
                                            <AnimatedTypography>€{(product.price / 100).toFixed(2)}</AnimatedTypography>
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
                <GlobalStyle />
                {/* For the cube and product image */}
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CubeContainer ref={cubeRef} onClick={handleClickOpen}>
                        {faces.map((_, i) => (
                            <CubeFace key={i}>
                                <CubeImage src={product.pictureUrl} alt={product.name} />
                            </CubeFace>
                        ))}
                    </CubeContainer>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{product.name}</DialogTitle>
                    <DialogContent style={{ backgroundColor: "#eaeaea" }}>
                        <DialogContentText onClick={handleOpenModal}>
                            <img src={product.pictureUrl} alt={product.name} style={{ width: "100%", cursor: "pointer" }} />
                        </DialogContentText>
                    </DialogContent>
                    <StyledDialogActions>
                        <Button onClick={handleClose}>Exit</Button>
                    </StyledDialogActions>
                </Dialog>
            </Grid>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    overflowY: "auto", // Enable vertical scrolling

                }}
            >
                <img src={product.pictureUrl} alt={product.name} style={{ width: "100%", cursor: "pointer" }} onClick={handleCloseModal}/>
            </Modal>
        </>
    );
}
