import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import ReviewSection from '@/components/ReviewSection';

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Premium Roleplay Framework',
    description: 'Complete roleplay system for your server',
    long_description: '',
    price: 49.99,
    category: 'scripts' as const,
    tags: ['roleplay', 'framework', 'complete'],
    thumbnail_url: 'https://images.unsplash.com/photo-1633356122544-f134ef2e00dc?w=500&h=300&fit=crop',
    images: [],
    seller_id: '1',
    downloads: 1250,
    rating: 4.8,
    reviews_count: 342,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: true,
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Realistic Vehicle System',
    description: 'High-performance vehicle physics engine',
    long_description: '',
    price: 39.99,
    category: 'vehicles' as const,
    tags: ['vehicles', 'physics', 'realistic'],
    thumbnail_url: 'https://images.unsplash.com/photo-1581092162562-40038f5fcde0?w=500&h=300&fit=crop',
    images: [],
    seller_id: '2',
    downloads: 890,
    rating: 4.7,
    reviews_count: 256,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: true,
    status: 'active' as const,
  },
  {
    id: '3',
    name: 'Modern UI Kit',
    description: 'Beautiful pre-built UI components',
    long_description: '',
    price: 29.99,
    category: 'ui-systems' as const,
    tags: ['ui', 'modern', 'components'],
    thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    images: [],
    seller_id: '3',
    downloads: 2150,
    rating: 4.9,
    reviews_count: 512,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    status: 'active' as const,
  },
  {
    id: '4',
    name: 'City Map - Downtown',
    description: 'Fully detailed city environment',
    long_description: '',
    price: 59.99,
    category: 'maps' as const,
    tags: ['maps', 'city', 'environment'],
    thumbnail_url: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&h=300&fit=crop',
    images: [],
    seller_id: '4',
    downloads: 543,
    rating: 4.6,
    reviews_count: 178,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    featured: false,
    status: 'active' as const,
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-400 text-lg">Handpicked assets from our top creators</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} featured={product.featured} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 bg-bp-darker">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Best Sellers</h2>
            <p className="text-gray-400 text-lg">Most popular items this month</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ReviewSection />
    </>
  );
}
