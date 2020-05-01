import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import formatValue from '../utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  category?: 'stickers' | 'accessories' | 'courses' | 'others';
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
  cartTotal: string;
  totalItensInCart: number;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsDataFromStorage = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (productsDataFromStorage) {
        setProducts(JSON.parse(productsDataFromStorage));
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    async function updateStorage(): Promise<void> {
      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(products),
      );
    }

    updateStorage();
  }, [products]);

  const increment = useCallback(
    id => {
      const productIndex = products.findIndex(item => item.id === id);
      if (productIndex >= 0) {
        setProducts(prev => {
          const product = prev[productIndex];
          product.quantity += 1;
          console.log(product);

          prev[productIndex] = product;

          return [...prev];
        });
      }
    },
    [products],
  );

  const addToCart = useCallback(
    async (product: Product) => {
      const productIndex = products.findIndex(item => item.id === product.id);

      if (productIndex >= 0) {
        try {
          increment(products[productIndex].id);
        } catch (err) {
          console.log(err);
        }
      } else {
        setProducts([...products, product]);
      }
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productIndex = products.findIndex(item => item.id === id);

      if (productIndex >= 0) {
        setProducts(prev => {
          const product = prev[productIndex];

          if (product.quantity > 1) {
            product.quantity -= 1;
            prev[productIndex] = product;
          } else {
            prev.splice(productIndex, 1);
          }

          return [...prev];
        });
      }
    },
    [products],
  );

  const cartTotal = useMemo(() => {
    const totalValue = products
      .map(item => item.price * item.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    return formatValue(totalValue);
  }, [products]);

  const totalItensInCart = useMemo(() => products.length, [products]);

  const value = React.useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      cartTotal,
      totalItensInCart,
    }),
    [products, addToCart, increment, decrement, cartTotal, totalItensInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
