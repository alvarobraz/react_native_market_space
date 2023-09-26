import { HStack, IButtonProps, Text } from 'native-base';
import { TouchableOpacity, View, StyleSheet  } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';

type Props = IButtonProps & {
  type: string[]
  checkBoxItem: string[]
  handleTypeCheckBox: (title: string) => void;
}

export function CheckBox({ type, checkBoxItem, handleTypeCheckBox, ...rest  }:Props) {

  const isChecked = checkBoxItem.filter((item) => type.includes(item));

  return (
    <>
    {checkBoxItem.map((title) => (
      <HStack key={title} flexDirection="row" alignItems="center" mb={3}>
        <TouchableOpacity
          onPress={() => handleTypeCheckBox(title)}
        >
        <View style={[styles.checkbox, isChecked.includes(title) && styles.checked]}>
          {isChecked.includes(title) && (
            <AntDesign
              name="check"
              size={14}
              color="white"
            />
          )}
        </View>
        </TouchableOpacity>
        <Text ml={3} fontFamily="regular" fontSize="md" color="gray.200">{title}</Text>
      </HStack>
    ))}
  </>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#9F9BA1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#647AC7',
    borderColor: '#647AC7',
  }
});