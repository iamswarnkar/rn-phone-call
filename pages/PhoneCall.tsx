import {
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  useColorScheme,
  PermissionsAndroid,
} from 'react-native';

import React, {useCallback, useEffect, useState} from 'react';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import CallLogs from 'react-native-call-log';
import {Text, View} from '../components/Themed';

interface PhoneNumbers {
  _id: string;
  phone_number: string;
  __v: string;
}

const keyExtractor = (data: PhoneNumbers) => data?._id;

export default function PhoneCall() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers[]>();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const isDarkMode = useColorScheme() === 'dark';

  const handleCallPress = async () => {
    console.log(isDarkMode);
    if (phoneNumber.length < 10) {
      Alert.alert('Massage', 'Enter valid phone number');
    } else {
      RNImmediatePhoneCall.immediatePhoneCall(phoneNumber);
    }
  };

  const makeCall = async (data: string) => {
    RNImmediatePhoneCall.immediatePhoneCall(data.toString());
  };

  const renderItem = useCallback(
    ({item}: {item: PhoneNumbers}) => {
      const onPress = () => {
        makeCall(item?.phone_number);
      };
      return (
        <View>
          <TouchableOpacity
            onPress={onPress}
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Image
              source={{
                uri: 'https://w7.pngwing.com/pngs/954/328/png-transparent-computer-icons-user-profile-avatar-heroes-head-recruiter.png',
              }}
              style={{height: 28, width: 28, borderRadius: 100}}
            />
            <Text>{item?.phone_number}</Text>
            <Image
              source={{
                uri: 'https://www.iconsdb.com/icons/preview/green/phone-xxl.png',
              }}
              style={{height: 28, width: 28, borderRadius: 100}}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [phoneNumbers],
  );

  const callLog = async () => {
    try {
      const filter = {phoneNumbers: 9951072005};
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Call Log permissions',
          message: 'Access your call logs',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const callLogs = await CallLogs.load(3, filter);
        console.log(callLogs, 'ccccccccccc');
      } else {
        Alert.alert('Massage', 'Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch('http://16.170.162.36:8001/new/data')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setPhoneNumbers(data?.numbersData);
          callLog();
        } else {
          Alert.alert('Network error', 'something want wrong');
        }
      })
      .catch(e => console.log(JSON.stringify(e), 'eeeeeeeeeeeeeeee'));
  }, []);

  return (
    <View style={{paddingHorizontal: 20, flex: 1}}>
      <TextInput
        keyboardType="number-pad"
        placeholderTextColor={isDarkMode ? '#000' : '#fff'}
        placeholder="Enter a phone number"
        maxLength={10}
        onChangeText={e => setPhoneNumber(e)}
        style={[styles.textInput, {color: isDarkMode ? '#000' : '#fff'}]}
      />
      <TouchableOpacity style={styles.button} onPress={handleCallPress}>
        <Text style={styles.text}> make a Call</Text>
      </TouchableOpacity>
      {phoneNumbers ? (
        <FlatList
          style={{marginTop: 20, width: '100%'}}
          data={phoneNumbers}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{height: 4}} />}
        />
      ) : (
        <ActivityIndicator
          style={{marginTop: 48}}
          size="large"
          color="#00ff00"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderColor: '#fff',
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#228B22',
    marginTop: 12,
    borderRadius: 8,
  },
});
