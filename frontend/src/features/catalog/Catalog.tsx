import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Catalog.list()
            .then(products => {
                setProducts(products)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])
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

    if (loading) return <LoadingComponent message="Loading products..." />
    return (
        <>
            <ProductList products={products} />

            {/* for testing */}
            {/* <Button onClick={addProduct}>Add product</Button> */}
        </>
    )

}