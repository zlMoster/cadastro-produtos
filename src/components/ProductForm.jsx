import { useState, useEffect } from 'react'

function ProductForm({ onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    let finalCategory = category

    if (category === 'nova') {
      const responseCategory = await fetch('http://localhost:3001/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategory,
        }),
      })

      const savedCategory = await responseCategory.json()

      setCategories([...categories, savedCategory])
      finalCategory = newCategory
    }

    const newProduct = {
      name,
      price,
      category: finalCategory,
    }

    const response = await fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

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

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Selecione uma categoria</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}

        <option value="nova">Nova Categoria</option>
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

      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default ProductForm