import { NativeBaseProvider } from 'native-base';
import { LogBox, StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { AppContextProvider } from '@contexts/AppContext';
import { Routes } from '@routes/index';

import { THEME } from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  LogBox.ignoreLogs(['Warning: In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
       <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AppContextProvider>
    </NativeBaseProvider>
  );
}