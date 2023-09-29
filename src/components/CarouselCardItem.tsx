import { View, Image } from 'native-base'
import { Dimensions } from "react-native"
import { LogBox } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

type PropsData = {
  id?: string;
  path: string;
}

type Props = {
  item: PropsData;
  index: number;
}

export function CarouselCardItem({ item }: Props) {

  LogBox.ignoreLogs(['Warning: Each child in a list should have a unique "key" prop.']);

  return (
    <View 
      bg="white"
      w={ITEM_WIDTH}
      key={item.id}
    >
      <Image
        w={ITEM_WIDTH}
        h="280px"
        source={{ uri: `http://192.168.100.7:3333/images/${item.path}` }}
        alt='produtos'
      />
    </View>
  )
}