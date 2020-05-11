import React, { useState, useEffect, useCallback } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  View,
  Image,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import formatValue from '../../utils/formatValue';
import { useCart } from '../../hooks/cart';
import api from '../../services/api';

import FloatingCart from '../../components/FloatingCart';

import gitSticker from '../../assets/sticker.png';

import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  SectionTitle,
  CategoriesContainer,
  CategoriesItemContainer,
  CategoriesList,
  CategoriesItem,
  Content,
  CategoryTitle,
  ProductContent,
  PromoTitle,
  PromoContainer,
  PromoSubTitle,
  PromoImg,
  PromoButton,
  PromoButtonText,
} from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  category?: 'stickers' | 'accessories' | 'courses' | 'others';
}

interface Category {
  name: string;
  icon: string;
  bgColor: string;
  title: string;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const [resCat, resProd] = await Promise.all([
        api.get<Category[]>('categories'),
        api.get<Product[]>('products'),
      ]);

      setProducts(resProd.data);
      setCategories(resCat.data);
    }

    loadProducts();
  }, []);

  function handleAddToCart(item: Product): void {
    addToCart({ ...item, quantity: 1 });
  }

  return (
    <Container>
      <Content>
        <PromoContainer>
          <PromoSubTitle>Black Friday</PromoSubTitle>
          <PromoTitle>Descontos de até 70% OFF</PromoTitle>
          <PromoButton>
            <PromoButtonText> COMPRAR </PromoButtonText>
          </PromoButton>
          <PromoImg source={gitSticker} />
        </PromoContainer>
        <CategoriesContainer>
          <SectionTitle>Categorias em alta</SectionTitle>
          <FlatList
            horizontal
            style={{ height: 130, marginTop: 20 }}
            data={categories}
            keyExtractor={item => item.name}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: 80,
            }}
            renderItem={({ item }) => (
              <CategoriesItemContainer>
                <CategoriesItem bgColor={item.bgColor}>
                  <FeatherIcon name={item.icon} size={47} color="#fff" />
                </CategoriesItem>
                <CategoryTitle>{item.title}</CategoryTitle>
              </CategoriesItemContainer>
            )}
          />
        </CategoriesContainer>
        <ProductContainer>
          <SectionTitle>Mais vendidos</SectionTitle>
          <ProductContent>
            <FlatList
              numColumns={2}
              style={{
                flex: 1,
                // paddingHorizontal: 10,
              }}
              data={products}
              keyExtractor={item => item.id}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{
                height: 80,
              }}
              renderItem={({ item }) => (
                <Product>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate('Details', { itemId: item.id })
                    }
                  >
                    <ProductImage source={{ uri: item.image_url }} />
                  </TouchableWithoutFeedback>
                  <ProductTitle>{item.title}</ProductTitle>
                  <PriceContainer>
                    <ProductPrice>{formatValue(item.price)}</ProductPrice>
                    <ProductButton
                      testID={`add-to-cart-${item.id}`}
                      onPress={() => handleAddToCart(item)}
                    >
                      <FeatherIcon size={20} name="plus" color="#C4C4C4" />
                    </ProductButton>
                  </PriceContainer>
                </Product>
              )}
            />
          </ProductContent>
        </ProductContainer>
      </Content>
      <FloatingCart />
    </Container>
  );
};

export default Dashboard;
