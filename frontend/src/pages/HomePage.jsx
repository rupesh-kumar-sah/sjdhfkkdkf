import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { products, categories } from '../data/mockData';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();

  const featuredProducts = products.filter(product => product.featured);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Matching the mountain background from screenshots */}
      <section className="relative h-96 bg-gradient-to-r bg-cover bg-center" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
               }}>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Authentic Nepali Goods,
              <br />
              Delivered.
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              From the Himalayas to your home, explore our handpicked collection of
              <br />
              clothing, shoes, and accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Shop The Collection
              </button>
              <button className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                Browse All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-gray-200"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our best-selling items, loved by customers for
              their quality and unique style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded z-10">
                      {product.discount}
                    </span>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-green-600 transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-green-600">
                      Rs.{product.price.toLocaleString()}.00
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        Rs.{product.originalPrice.toLocaleString()}.00
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;