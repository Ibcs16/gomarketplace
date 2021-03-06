import React, { useEffect } from 'react';

import { View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import loading from '../../assets/animations/loading-cart.json';
import Logo from '../../assets/logo.png';

const Splash: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loader = setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000);

    return () => {
      clearTimeout(loader);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView style={{ width: 100 }} source={loading} autoPlay loop />
      <Image source={Logo} />
    </View>
  );
};

export default Splash;
