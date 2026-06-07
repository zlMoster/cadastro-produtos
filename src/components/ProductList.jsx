function ProductList({ products }) {
  return (
    <div>
      <h2>Produtos Cadastrados</h2>

      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <h3>{product.name}</h3>

          <p>
            <strong>Preço:</strong> R$ {product.price}
          </p>

          <p>
            <strong>Categoria:</strong> {product.category}
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProductList