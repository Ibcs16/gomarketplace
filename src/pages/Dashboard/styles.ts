import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import stickerImg from '../../assets/sticker.png';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
  category?: 'stickers' | 'accessories' | 'courses' | 'others';
}

export const Container = styled.SafeAreaView`
  margin-top: 60px;
  flex: 1;

  /* align-items: center; */
`;

export const Content = styled.ScrollView``;

export const ProductContainer = styled.View`
  margin-top: 0px;
  padding: 25px;
  /* flex: 1; */
`;

export const ProductContent = styled.View`
  border-radius: 5px;
  margin-top: 15px;
  /* flex: 1; */
  flex-direction: row;
`;

export const ProductList = styled(FlatList).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 10px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 5px;
  margin: 8px;
  flex: 1;
`;

export const ProductImage = styled.Image`
  height: 122px;
  width: 122px;
  align-self: center;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
  margin-top: 10px;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #e83f5b;
`;

export const ProductButton = styled.TouchableOpacity``;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
`;

export const CategoriesContainer = styled.View`
  margin-top: 10px;
  padding: 25px;
  /* flex: 1; */
`;

interface CategoriesItemProps {
  bgColor: string;
}

export const CategoriesItem = styled.View<CategoriesItemProps>`
  width: 88px;
  height: 92px;
  border-radius: 10px;
  background: #${props => props.bgColor};
  align-items: center;
  justify-content: center;
  margin-right: 25px;
`;

export const CategoriesList = styled(FlatList)``;

export const CategoryTitle = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const PromoContainer = styled.View`
  height: 250px;
  padding: 25px;
  background: #ededed;

  /* background-image: ${stickerImg}; */
`;

export const PromoImg = styled.Image`
  width: 400px;
  height: 400px;
`;

export const PromoSubTitle = styled.Text`
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: rgba(0, 0, 0, 0.52);
`;

export const PromoTitle = styled.Text`
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;
  text-align: left;
  margin-top: 8px;
  width: 70%;
`;

export const PromoButton = styled.TouchableOpacity`
  height: 40px;
  background-color: #e83f5b;
  align-items: center;
  justify-content: center;
  max-width: 110px;
  margin-top: 15px;
`;

export const PromoButtonText = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;

export const CategoriesItemContainer = styled.View``;
