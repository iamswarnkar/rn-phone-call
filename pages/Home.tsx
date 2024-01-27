import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {homeScreen} from '../constants/HomeData';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Text, View} from '../components/Themed';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}
function Home({navigation}: Props) {
  const isDarkMode = useColorScheme() === 'dark';

  const showToast = (massage: string) => {
    ToastAndroid.show(`${massage} is under development`, ToastAndroid.SHORT);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigateToStartCalling = () => {
    navigation.navigate('PhoneCall');
  };
  const navigateToDummyData = () => {
    navigation.navigate('DummyData');
  };
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text numberOfLines={2} style={{textAlign: 'center', fontSize: 28}}>
            Welcome
          </Text>
          <Text style={{textAlign: 'center', marginBottom: 8, fontSize: 28}}>
            Analogue it solutions
          </Text>
          <TouchableOpacity
            onPress={navigateToStartCalling}
            style={{
              backgroundColor: 'blue',
              width: '80%',
              borderRadius: 20,
              marginTop: 8,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 8,
              }}>
              Start Calling
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToDummyData}
            style={{
              backgroundColor: 'pink',
              width: '80%',
              borderRadius: 20,
              marginTop: 8,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 8,
              }}>
              navigateToDummyData
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {homeScreen.map(item => (
            <View key={item.id} style={{padding: 8}}>
              <TouchableOpacity
                onPress={() => showToast(item.title)}
                style={{
                  height: 150,
                  width: 150,
                  backgroundColor: item.backGround,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;
