import { useState, useEffect } from "react";
import { Product } from "./product";

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
      <h1>F13 Fullstack</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}> {product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick = {addProduct}>Add product</button>
    </div>
  );
}

export default App;
