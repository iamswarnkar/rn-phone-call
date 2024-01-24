import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

import {homeScreen} from '../constants/HomeData';

function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  const showToast = (massage: string) => {
    ToastAndroid.show(`${massage} is under development`, ToastAndroid.SHORT);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigateToStartCalling = () => {
    RNImmediatePhoneCall.immediatePhoneCall('8673809041');
  };
  return (
    <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{marginTop: 40}}>
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
