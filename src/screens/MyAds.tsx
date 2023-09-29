import { useEffect } from 'react';
import HeaderAds from '@components/HeaderAds';
import { ScrollView, Box, CheckIcon, Select, Text, VStack } from 'native-base';
import { ProductAds } from '@components/ProductAds';
import { dimensionWith } from '@utils/dimensionWith';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useAuth } from '@hooks/useAuth';
import { Loading } from '@components/Loading';


export function MyAds() {

  const { 
    myProducts,
    fetchMyProducts,
    countMyProducts,
    isLoadingMyProducts,
    setSelectMyProducts,
    selectMyProducts
  } = useAuth();

  const dimension = dimensionWith()

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  
  function handleCreateAndEdit() {
    navigation.navigate('createandedit', {
      id: undefined
    });
  }

  function handleDetailAd(id: string) {
    navigation.navigate('detailAd', {
      id
    });
  }

  // useEffect(()=>{
  //   fetchMyProducts()
  // },[])

  return (
    <ScrollView w="full"showsVerticalScrollIndicator={false}>
      <VStack>
      <HeaderAds
        iconLeft={false}
        title='Meus anúncios'
        iconRight={true}
        nameIconRight='add'
        handleCreateAndEdit={handleCreateAndEdit}
      />
      {
        isLoadingMyProducts ?
        <Loading/>
        :
        <>
        <Box px={dimension > 400 ? 10 : 5} flexDir="row" justifyContent="space-between" alignContent="center" alignItems="center">
          <Text fontFamily="regular" fontSize="sm" color="gray.200">
            {countMyProducts > 0 ? `${countMyProducts} anúncíos`: `${countMyProducts} anúncío`}
          </Text>
          <Select w="111px" h="34px" selectedValue={selectMyProducts} accessibilityLabel="Todos" placeholder="Todos" _selectedItem={{
            bg: "gray.600",
            endIcon: <CheckIcon style={{ transform: [{scale: 0.5}] }} />
          }} mt={1} onValueChange={itemValue => setSelectMyProducts(itemValue)}>
              <Select.Item label="Todos" value="all" />
              <Select.Item label="Novo" value="new" />
              <Select.Item label="usado" value="used" />
            </Select>
        </Box>
        <Box px={dimension > 400 ? 10 : 5} top={6} flexDir="row" flexWrap="wrap" justifyContent="space-between" pb={10} maxW="full">
          {
            isLoadingMyProducts ?
            <Loading/>
            :
            myProducts.map((product, index) => (
              <ProductAds
                key={index}
                onPress={ () => handleDetailAd(product?.id!) }
                product={product}
              />
            ))
          }
        </Box>
        </>
      }
    </VStack>
    </ScrollView>
  );
}