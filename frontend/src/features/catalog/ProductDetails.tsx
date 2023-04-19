import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography, styled } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import axios from "axios";
import agent from "../../app/api/agent";

const ProductImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
});

const ProductInfo = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
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
    fontWeight: 'bold',
  });


export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) return <h3>Loading...</h3>

    if (!product) return <h3>Couldn't find the product</h3>


    return (
        <Grid container spacing={6} alignItems='center'>
            <ProductInfo item xs={12} md={6}>
                <NeonTableContainer>
                    <Table>
                        <TableBody sx={{ fontSize: '1.1em' }}>
                            <TableRow>
                                <NeonTableCell colSpan={2}>
                                    <Typography variant='h3'>{product.name}</Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant='h4' color='secondary'>
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
                </NeonTableContainer>
            </ProductInfo>
            <Grid item xs={12} md={6}>
                <ProductImage src={product.pictureUrl} alt={product.name} />
            </Grid>
        </Grid>
    );
}