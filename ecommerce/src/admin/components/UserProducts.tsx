import React, { useState, useEffect } from 'react';
import { useCurrentAdmin } from 'adminjs';
import { Box, H2, H5, Text, Button, Badge, Input, Label, FormGroup, MessageBox } from '@adminjs/design-system';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl?: string;
  category?: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
}

const UserProducts: React.FC = () => {
  const [currentAdmin] = useCurrentAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories', {
        credentials: 'include',
      });
      const result = await response.json();
      setCategories(result.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchProducts = async (categoryId?: string, search?: string) => {
    setLoading(true);
    try {
      let url = '/api/products?';
      if (categoryId) url += `categoryId=${categoryId}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;

      const response = await fetch(url, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result = await response.json();
      setProducts(result.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId, searchQuery);
  };

  const handleSearch = () => {
    fetchProducts(selectedCategory, searchQuery);
  };

  const handleAddToCart = async (productId: number, productName: string) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use AdminJS session cookies
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add to cart');
      }

      setSuccess(`${productName} added to cart!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    }
  };

  if (!currentAdmin) {
    return (
      <Box padding="xxl">
        <Text>Not authenticated</Text>
      </Box>
    );
  }

  return (
    <Box padding="xxl">
      <H2 marginBottom="xl">Browse Products</H2>

      {error && (
        <MessageBox message={error} variant="danger" onClose={() => setError(null)} />
      )}

      {success && (
        <MessageBox message={success} variant="success" onClose={() => setSuccess(null)} />
      )}

      {/* Filters */}
      <Box bg="white" border="default" borderRadius="default" padding="lg" marginBottom="xl">
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <FormGroup flex="1" minWidth="200px" marginRight="lg">
            <Label>Category</Label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #d9d9d9',
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup flex="2" minWidth="300px" marginRight="lg">
            <Label>Search</Label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search products..."
            />
          </FormGroup>

          <Box display="flex" alignItems="flex-end">
            <Button onClick={handleSearch}>Search</Button>
          </Box>
        </Box>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <Text>Loading products...</Text>
      ) : products.length === 0 ? (
        <Box padding="xxl" style={{ textAlign: 'center' }}>
          <Text color="grey60" fontSize="lg">
            No products found
          </Text>
        </Box>
      ) : (
        <Box display="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((product) => (
            <Box
              key={product.id}
              bg="white"
              border="default"
              borderRadius="default"
              padding="lg"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Product Image */}
              <Box marginBottom="md">
                <Box
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!product.imageUrl && (
                    <Text color="grey60">No Image</Text>
                  )}
                </Box>
              </Box>

              {/* Product Info */}
              <Box marginBottom="md">
                <H5 marginBottom="sm">{product.name}</H5>
                <Text fontSize="sm" color="grey60" marginBottom="sm">
                  {product.description}
                </Text>
                {product.category && (
                  <Badge variant="info" size="sm" style={{ marginBottom: '8px' }}>
                    {product.category.name}
                  </Badge>
                )}
              </Box>

              {/* Price and Stock */}
              <Box marginBottom="md">
                <Text fontSize="xl" fontWeight="bold" color="primary100">
                  ${Number(product.price).toFixed(2)}
                </Text>
                <Text fontSize="sm" color={product.stock > 0 ? 'success' : 'error'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Text>
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                onClick={() => handleAddToCart(product.id, product.name)}
                disabled={product.stock === 0}
                style={{ width: '100%' }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserProducts;
