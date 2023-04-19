import { useState, useEffect } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
    .then(response => response.json())
    .then(data=> setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState => [...prevState, {
      id: prevState.length + 101,
      name: 'product' + (prevState.length + 1),
      price: (prevState.length *100) +100,
      category: 'some category',
      description: 'some description',
      pictureUrl: 'http://picsum.photos/200',
    }])
  }


  return (
    <div>
      <Typography variant="h1">F13 Fullstack</Typography>
      <Catalog products={products} addProduct={addProduct}/>
      
    </div>
  );
}

export default App;