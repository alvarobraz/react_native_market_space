import { Center, Text, VStack } from 'native-base';
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderAds from '@components/HeaderAds';

type RouteParams = {
  id: string;
}

export function DetailAd() {

  const route = useRoute()
  const { id } = route.params as RouteParams

  console.log(id)

  return (
    <VStack>
      <HeaderAds
        iconLeft={true}
        nameIconLeft='arrow-back'
        title='Meus anúncios'
        iconRight={true}
        nameIconRight='arrow-forward'
      />
    </VStack>
  );
}