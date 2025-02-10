import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 7999.99,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'MacBook Pro M2',
    price: 12499.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    category: 'Notebooks',
    brand: 'Apple'
  },
  {
    id: 3,
    name: 'Galaxy S24 Ultra',
    price: 6999.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    category: 'Smartphones',
    brand: 'Samsung'
  },
  {
    id: 4,
    name: 'AirPods Pro',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=800',
    category: 'Acessórios',
    brand: 'Apple'
  },
  {
    id: 5,
    name: 'Monitor Gamer 27"',
    price: 2499.99,
    image: 'https://s2-techtudo.glbimg.com/d2gls3Wkf2SI7uZ9ge-2frAa5_I=/0x0:869x480/1000x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/C/V/aekAXMRwKDlKA9vhaOew/curvo-27.jpg',
    category: 'Monitores',
    brand: 'Samsung'
  },
  {
    id: 6,
    name: 'Teclado Mecânico RGB',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
    category: 'Acessórios',
    brand: 'Logitech'
  }
];

const categories = ['Todos', 'Smartphones', 'Notebooks', 'Acessórios', 'Monitores'];
const brands = ['Todos', 'Apple', 'Samsung', 'Logitech'];
const priceRanges = [
  { label: 'Todos', min: 0, max: Infinity },
  { label: 'Até R$ 1.000', min: 0, max: 1000 },
  { label: 'R$ 1.000 - R$ 3.000', min: 1000, max: 3000 },
  { label: 'R$ 3.000 - R$ 5.000', min: 3000, max: 5000 },
  { label: 'Acima de R$ 5.000', min: 5000, max: Infinity }
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todos');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
    const brandMatch = selectedBrand === 'Todos' || product.brand === selectedBrand;
    const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    return categoryMatch && brandMatch && priceMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Nossos Produtos</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <Sliders className="h-5 w-5" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className={`md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filtros</h2>
            
            {/* Categorias */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categorias</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Marcas */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Marcas</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(brand)}
                      className="mr-2"
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div>
              <h3 className="font-medium mb-2">Faixa de Preço</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <label key={range.label} className="flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                      className="mr-2"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <p className="text-xl font-bold text-indigo-600 mb-4">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}