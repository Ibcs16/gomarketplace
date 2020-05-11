import React, { useEffect, useState } from 'react';

import { View, Image, FlatList } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { RouteProp } from '@react-navigation/native';

import Skeleton from 'react-loading-skeleton';

import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  Container,
  Hero,
  InfoContainer,
  InfoHeader,
  ProductDetails,
  ProductImage,
  InfoTitle,
  AddToCartButton,
  AddToCartButtonText,
  ColorSelectionItem,
  ColorsContainer,
  SectionTitle,
  Price,
  Reviews,
  ReviewsText,
} from './styles';
import api from '../../services/api';

import stickerImg from '../../assets/sticker.png';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

type RootStackParamList = {
  Details: { itemId: string };
  Splash: undefined;
  Dashboard: undefined;
  Cart: undefined;
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  category?: 'stickers' | 'accessories' | 'courses' | 'others';
}

interface Color {
  bgColor: string;
  selected: boolean;
}
const colors: Color[] = [
  { bgColor: 'purple', selected: true },
  { bgColor: 'gray', selected: false },
  { bgColor: 'aquamarine', selected: false },
  { bgColor: 'red', selected: false },
  { bgColor: 'black', selected: false },
  { bgColor: 'orange', selected: false },
];

const Details: React.FC<DetailsProps> = ({ route }) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const { itemId } = route.params;
  const { addToCart } = useCart();

  useEffect(() => {
    api.get<Product>(`products/${itemId}`).then(res => {
      setProduct(res.data);
    });
  }, [itemId]);

  return (
    <Container>
      <Hero style={{ backgroundColor: '#fff' }}>
        {product.image_url && (
          <ProductImage source={{ uri: product.image_url }} />
        )}
      </Hero>
      <InfoContainer>
        <InfoHeader>
          <InfoTitle>{product.title}</InfoTitle>
          <Price>{formatValue(product.price)}</Price>
        </InfoHeader>
        <Reviews>
          <Icon name="star" size={18} color="#E28D0A" />
          <Icon name="star" size={18} color="#E28D0A" />
          <Icon name="star" size={18} color="#E28D0A" />
          <Icon name="star" size={18} color="#E28D0A" />
          <Icon name="star" size={18} color="#ccc" />
          <ReviewsText>12 Reviews</ReviewsText>
        </Reviews>
        <ProductDetails>
          <ColorsContainer>
            <SectionTitle>Cores disponíveis</SectionTitle>
            <FlatList
              horizontal
              style={{ height: 60, marginTop: 20, marginBottom: 30 }}
              data={colors}
              keyExtractor={item => item.bgColor}
              // ListFooterComponent={<View />}
              // ListFooterComponentStyle={{
              //   height: 30,
              // }}
              renderItem={({ item }) => (
                <ColorSelectionItem
                  selected={item.selected}
                  bgColor={item.bgColor}
                />
              )}
            />
          </ColorsContainer>

          {/* </ColorSelectionItem> */}
          <AddToCartButton onPress={() => addToCart(product)}>
            <Icon name="plus" size={16} color="#fff" />
            <AddToCartButtonText>Adicionar ao carrinho</AddToCartButtonText>
          </AddToCartButton>
        </ProductDetails>
      </InfoContainer>
    </Container>
  );
};

export default Details;
