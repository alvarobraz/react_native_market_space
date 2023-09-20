import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Catalog } from '@screens/Catalog';
import { MyAds } from '@screens/MyAds';
import { DetailAd } from '@screens/DetailAd';
import House from '../assets/house.svg'
import Tag from '../assets/tag.svg'
import Logout from '../assets/logout.svg'
import { SignOut } from '@screens/SignOut';
import { TouchableOpacity } from 'react-native';


type AppRoutes = {
  home: undefined;
  myads: undefined;
  detailAd: {
    id: string
  }
  signout: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { colors, sizes } = useTheme();

  const iconSize = sizes[5];


  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[200],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[700],
        borderTopWidth: 0,
        height: 60,
        shadowColor: colors.gray[700],
      },
    }}
    sceneContainerStyle={{
      backgroundColor: colors.gray[600],
    }}
    >
      <Screen 
        name='home'
        component={Catalog}
        options={{
          tabBarIcon: ({ color  }) => (
            <House fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name='myads'
        component={MyAds}
        options={{
          tabBarIcon: ({ color  }) => (
            <Tag fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Screen 
        name='detailAd'
        component={DetailAd}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarItemStyle: {
            display: 'none',
          },
        }}
        // options={{ tabBarButton: () => null }}
      />
      <Screen
        name="signout"
        component={SignOut}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
            >
              <Logout width={iconSize} height={iconSize} />
            </TouchableOpacity>
          ),
        }}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault()
              console.log('signout')
              // navigation.navigate('signIn')
            },
          }
        }}
      />    
    </Navigator>
  );
}