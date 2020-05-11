import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import {
  lighten,
  setSaturation,
  setLightness,
  setHue,
  adjustHue,
  saturate,
} from 'polished';

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Hero = styled.View`
  height: 402px;
  padding: 40px;
  align-items: center;
  justify-content: center;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  border-bottom-color: #333;

  /* width: 122px; */
  /* background: #ededed; */
`;

export const InfoContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const InfoTitle = styled.Text`
  font-weight: bold;
  font-size: 28px;
  line-height: 28px;
  text-align: left;
  /* margin-top: 8px; */
  width: 70%;
`;

export const InfoHeader = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding-top: 8px;
  /* background-color: red; */
  flex: 1;
`;

export const ProductDetails = styled.View`
  /* justify-content: space; */
  /* flex: 1; */
  margin-top: 20px;
  /* background-color: red; */
  /* flex: 1; */
`;

export const ProductImage = styled.Image`
  height: 100%;
  width: 100%;
  /* align-self: center; */
`;

export const AddToCartButton = styled.TouchableOpacity`
  /* margin-top: 20px; */
  max-width: 400px;
  width: 100%;
  background: #e83f5b;
  border-width: 1px;
  border-color: #e83f5b;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  height: 55px;
  align-self: center;
  flex-direction: row;

  /* margin-bottom: 20px; */
  /* flex: 1; */
`;

export const AddToCartButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
`;

interface ColorItem {
  bgColor: string;
  selected: boolean;
}

export const ColorSelectionItem = styled.TouchableOpacity<ColorItem>`
  width: 60px;
  height: 60px;
  background-color: ${props => lighten(0.1, saturate(0.1, props.bgColor))};
  opacity: 0.5;
  border-width: 7px;
  border-color: ${lighten(0.2, '#888')};
  border-radius: 30px;

  margin-right: 10px;

  /* ${props =>
    props.selected &&
    css`
      border-width: 8px;
      width: 66px;
      height: 66px;
      border-radius: 33px;
    `} */
`;

export const ColorsContainer = styled.View`
  margin-top: 10px;
  /* padding: 20px; */
  /* flex: 1; */
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 23px;
  opacity: 0.7;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
  line-height: 22px;
  /* opacity: 0.7; */
`;

export const Reviews = styled.View`
  flex-direction: row;
  align-items: center;
  /* justify-content: left; */
`;

export const ReviewsText = styled.Text`
  font-size: 16px;
  /* opacity: 0.6; */
  font-weight: bold;
  color: #888;
  margin-left: 10px;
`;
