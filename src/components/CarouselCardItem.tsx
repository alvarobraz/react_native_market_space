import { View, Image } from 'native-base'
import { Dimensions } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

type PropsData = {
  imgUrl: string;
}

type Props = {
  item: PropsData;
  index: number;
}

export function CarouselCardItem({ item, index }: Props) {
  return (
    <View 
      bg="white"
      w={ITEM_WIDTH}
      key={index}
    >
      <Image
        w={ITEM_WIDTH}
        h="280px"
        source={{ uri: item.imgUrl }}
        alt='produtos'
      />
    </View>
  )
}