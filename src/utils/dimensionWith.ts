import {Dimensions} from 'react-native';

export function dimensionWith() {
  const windowWidth = Dimensions.get('window').width;
  return windowWidth
}