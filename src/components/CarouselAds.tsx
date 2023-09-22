import { useRef, useState } from 'react'
import Carousel from 'react-native-snap-carousel'
import { CarouselCardItem, SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCardItem'
import { View, HStack, Box, Text } from 'native-base'

type Props = {
  isActive?: 'active' | 'inactive'
}

export function CaroulselAds({ isActive }: Props) {
  const isCarousel = useRef(null)

  const [ activeIndex, setActiveIndex ] = useState(0)

  const data = [
    {
      imgUrl: "https://nestjstraining.s3.amazonaws.com/carousel_img.png",
    },
    {
      imgUrl: "https://nestjstraining.s3.amazonaws.com/carousel_img_2.png",
    },
    {
      imgUrl: "https://nestjstraining.s3.amazonaws.com/carousel_img.png",
    },
  ];

  // console.log(isActive)

  return (
    <View>
      {
        isActive === 'inactive' ?
        <Box 
          bg="gray.300"
          w={ITEM_WIDTH}
          h="280px"
          position="absolute"
          zIndex="999"
          backgroundColor="rgba(128, 128, 128, 0.4)"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontFamily="bold" fontSize="sm" color="gray.700">
            ANÚNCIO DESATIVADO
          </Text>
        </Box>
        :
        null
      }
      <Carousel
        layout="tinder"
        layoutCardOffset={0}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        key={1}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        vertical={false}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {data.map((_, index) => (
          <>
            <HStack key={index}>
              <View
                key={index}
                h="3px" 
                w="30%"
                borderRadius="3px" 
                bg="gray.700"
                opacity={index === activeIndex ? "0.5" : "1"}
                my={0} 
                mx="4px"
                bottom={1}
                position="absolute"
                left={index === 0 ? "2.5%" : index === 1 ? "34.5%" : "66.5%"}
              />
            </HStack>
          </>
        ))}
    </View>
  )
}
