import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { products, reviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/" className="text-green-600 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter(review => review.productId === product.id);
  
  const handleAddToCart = () => {
    // Validate size selection if product has sizes
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }

    // Validate color selection if product has colors
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive"
      });
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  const renderStars = (rating, interactive = false, onClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={() => interactive && onClick && onClick(index + 1)}
      />
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback."
    });
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded z-10">
                  {product.discount}
                </span>
              )}
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => 
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-green-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-green-600">
                Rs.{product.price.toLocaleString()}.00
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  Rs.{product.originalPrice.toLocaleString()}.00
                </span>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Size: {selectedSize}</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium ${
                        selectedSize === size
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color ? 'border-gray-900' : 'border-gray-300'
                      } ${
                        color.toLowerCase() === 'black' ? 'bg-black' :
                        color.toLowerCase() === 'brown' ? 'bg-amber-800' :
                        color.toLowerCase() === 'red' ? 'bg-red-600' :
                        color.toLowerCase() === 'blue' ? 'bg-blue-600' :
                        color.toLowerCase() === 'green' ? 'bg-green-600' :
                        color.toLowerCase() === 'khaki' ? 'bg-yellow-600' :
                        'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>🛒</span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <p className="text-gray-600 mb-8">See what others are saying about this product.</p>

          {/* Existing Reviews */}
          <div className="space-y-6 mb-12">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {review.userInitials}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Write Review */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="What did you like or dislike?"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;