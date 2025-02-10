import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const featuredProducts = [
  {
    id: 1,
    name: 'iPhone',
    price: "7.500",
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'MacBook Pro',
    price: "12.500",
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Fone de Ouvido Wireless',
    price: "999",
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
  },
];

const categories = [
  {
    id: 1,
    name: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Notebooks',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Hero Banner */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[500px]"
      >
        <SwiperSlide>
          <div 
            className="h-full bg-cover bg-center flex items-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2000)' }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h1 className="text-4xl font-bold text-white mb-4">Novas Tecnologias</h1>
                <p className="text-white mb-6">Descubra o que há de moderno com nossa mais nova coleção.</p>
                <Link
                  to="/products"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Compre Aqui
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">R$ {product.price}</p>
                  <button 
                    onClick={() => {
                      navigate('/products');
                      window.scrollTo({top: 0, behavior: 'instant' })
                    }}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                    >
                    Veja Mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comprar por Categoria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}