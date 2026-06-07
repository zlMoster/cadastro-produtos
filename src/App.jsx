import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import './App.css'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
  }, [])

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct])
  }

  return (
    <div className="container">
      <h1>Cadastro de Produtos</h1>

      <ProductForm onAdd={addProduct} />

      <ProductList products={products} />
    </div>
  )
}

export default App