import { useState, useEffect } from 'react'


function ProductForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')  
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
  fetch('http://localhost:3001/categories')
    .then(response => response.json())
    .then(data => setCategories(data))
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

const newProduct = {
  name,
  price,
  category: category === 'nova'
    ? newCategory
    : category
}

    const response = await fetch(
      'http://localhost:3001/products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      }
    )

    const data = await response.json()

    onAdd(data)

    setName('')
    setPrice('')
    setCategory('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Selecione uma categoria</option>

  <option value="Periféricos">Periféricos</option>
  <option value="Hardware">Hardware</option>
  <option value="Monitores">Monitores</option>
  <option value="Acessórios">Acessórios</option>

  <option value="nova">+ Nova Categoria</option>
</select>

{category === 'nova' && (
  <input
    type="text"
    placeholder="Digite a nova categoria"
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
    required
  />
)}

      <button type="submit">
        Cadastrar
      </button>
    </form>
  )
}

export default ProductForm