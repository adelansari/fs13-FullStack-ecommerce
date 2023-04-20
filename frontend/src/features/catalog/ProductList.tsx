import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid2 container spacing={4}>
            {products.map(product => (
                <Grid2  xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                </Grid2>
            ))}
        </Grid2>
    )
}