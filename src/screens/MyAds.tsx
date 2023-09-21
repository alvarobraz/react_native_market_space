import { useState } from 'react';
import HeaderAds from '@components/HeaderAds';
import { ScrollView, Box, CheckIcon, Select, Text, VStack } from 'native-base';
import { ProductAds } from '@components/ProductAds';
import { dimensionWith } from '@utils/dimensionWith';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function MyAds() {

  const dimension = dimensionWith()
  const [service, setService] = useState("");

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  function handleDetailAd(id: string) {
    navigation.navigate('detailAd', {
      id
    });
  }

  return (
    <ScrollView w="full"showsVerticalScrollIndicator={false}>
      <VStack>
      <HeaderAds
        iconLeft={false}
        title='Meus anúncios'
        iconRight={true}
        nameIconRight='add'
        // handleGoBack={handleGoBack}
      />
      <Box px={dimension > 400 ? 10 : 5} flexDir="row" justifyContent="space-between" alignContent="center" alignItems="center">
        <Text fontFamily="regular" fontSize="sm" color="gray.200">
          9 anúncíos
        </Text>
        <Select w="111px" h="34px" selectedValue={service} accessibilityLabel="Todos" placeholder="Todos" _selectedItem={{
          bg: "gray.600",
          endIcon: <CheckIcon style={{ transform: [{scale: 0.5}] }} />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="Todos" value="all" />
            <Select.Item label="Novo" value="new" />
            <Select.Item label="usado" value="used" />
          </Select>
      </Box>
      <Box px={dimension > 400 ? 10 : 5} top={6} flexDir="row" flexWrap="wrap" justifyContent="space-between" pb={10} maxW="full">
          <ProductAds 
            variant="new"
            onPress={ () => handleDetailAd('1') }
          />
          <ProductAds />
          <ProductAds />
          <ProductAds variant="new" />
          <ProductAds adsInactive={true} />
          <ProductAds />
        </Box>
    </VStack>
    </ScrollView>
  );
}