import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - High to low" },
    { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const dispatch = useAppDispatch();
    const { productsLoaded, filtersLoaded, companies, categories, productParams, metaData } = useAppSelector((state) => state.catalog);

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded]);

    // for testing
    // function addProduct() {
    //     setProducts(prevState => [...prevState, {
    //         id: prevState.length + 101,
    //         name: 'product' + (prevState.length + 1),
    //         price: (prevState.length * 100) + 100,
    //         category: 'some category',
    //         description: 'some description',
    //         pictureUrl: 'http://picsum.photos/200',
    //     }])
    // }

    if (!filtersLoaded) return <LoadingComponent message="Loading products..." />;
    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <ProductSearch />
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <RadioButtonGroup selectedValue={productParams.orderBy} options={sortOptions} onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))} />
                </Paper>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <CheckboxButtons items={companies} checked={productParams.companies} onChange={(checkedItems: string[]) => dispatch(setProductParams({ companies: checkedItems }))} />
                </Paper>
                <Paper sx={{ p: 2 }}>
                    <CheckboxButtons items={categories} checked={productParams.categories} onChange={(checkedItems: string[]) => dispatch(setProductParams({ categories: checkedItems }))} />
                </Paper>
            </Grid>
            <Grid item xs={9} sx={{ mb: 2 }}>
                {metaData && <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />}
            </Grid>
        </Grid>
    );
}
