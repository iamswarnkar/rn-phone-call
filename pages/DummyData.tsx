import {
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';

import React, {useCallback, useEffect, useState} from 'react';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import CallLogs from 'react-native-call-log';
import {Text, View} from '../components/Themed';
import CallDetectorManager from 'react-native-call-detection';

interface PhoneNumbers {
  _id: string;
  phone_number: string;
  __v: string;
}

interface CallLogs {
  dateTime: string;
  duration: number;
  name: string;
  phoneNumber: string;
  rawType: string;
  timestamp: string;
  type: string;
}

const keyExtractor = (data: PhoneNumbers) => data?._id;
const callLogKeyExtractor = (data: CallLogs) => data?.timestamp;
const data: PhoneNumbers[] = [
  {
    _id: '1',
    phone_number: '191',
    __v: '222',
  },
  {
    _id: '2',
    phone_number: '192',
    __v: '222',
  },
  {
    _id: '3',
    phone_number: '193',
    __v: '222',
  },
  {
    _id: '4',
    phone_number: '198',
    __v: '222',
  },
];
export default function DummyData() {
  let callDetector: {dispose: () => any};
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers[]>([]);
  const [callLogs, setCallLogs] = useState<CallLogs[]>();
  const [phoneNumberIndex, setPhoneNumberIndex] = useState(0);

  const makeCall = async (data: string) => {
    RNImmediatePhoneCall.immediatePhoneCall(data.toString());
  };

  const renderItem = useCallback(
    ({item, index}: {item: PhoneNumbers; index: number}) => {
      const onPress = () => {
        setPhoneNumberIndex(index);
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
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://w7.pngwing.com/pngs/954/328/png-transparent-computer-icons-user-profile-avatar-heroes-head-recruiter.png',
              }}
              style={{height: 28, width: 28, borderRadius: 100}}
            />
            <Text>{item?.phone_number}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>start Call</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [],
  );

  const ItemSeparatorComponent = () => <View style={{height: 8}} />;

  const callLog = async () => {
    try {
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
        const callLogs = await CallLogs.load(7);
        const result = data?.map(row =>
          callLogs.filter(
            (row2: CallLogs) =>
              row2.phoneNumber.replace('+91', '') ===
              row.phone_number.toString(),
          ),
        );

        setCallLogs(result?.flat());
      } else {
        Alert.alert('Massage', 'Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const callLogsListHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text>Phone number</Text>
        <Text>duration</Text>
        <Text>Call status</Text>
      </View>
    );
  };

  const callLogRenderItems = ({item}: {item: CallLogs}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text>{item.phoneNumber}</Text>
        {item.type === 'OUTGOING' && (
          <>
            <Text>
              {item.duration > 0
                ? Math.floor(item.duration / 60) +
                  'M: ' +
                  (item.duration % 60 ? (item.duration % 60) + 'sec' : '00sec')
                : '00 sec'}
            </Text>
            <Text>{item.duration > 0 ? 'answer' : ' not answer'}</Text>
          </>
        )}
      </View>
    );
  };

  useEffect(() => {
    callLog();
    startListener();

    return () => {
      stopListener();
    };
  }, []);

  const startListener = useCallback(() => {
    callDetector = new CallDetectorManager(
      (event: string, phoneNumber: string) => {
        if (event === 'Disconnected') {
          for (let i = 0; i < data.length - 1; i++) {
            if (phoneNumber === data[i].phone_number) {
              makeCall(data[i + 1]?.phone_number);
              break;
            }
          }
        } else if (event === 'Incoming') {
          // Do something call got incoming
        } else if (event === 'Offhook') {
        }
      },
      false,
      () => {
        console.error('Permission denied');
      },
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react to incoming calls.',
      },
    );
  }, []);

  const stopListener = () => {
    callDetector && callDetector.dispose();
  };

  return (
    <View style={{height: '100%'}}>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          style={{marginTop: 20, width: '100%'}}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </View>
      {callLogs && (
        <View
          style={{
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Call Log Report
          </Text>

          <FlatList
            data={callLogs}
            style={{paddingHorizontal: 20, marginTop: 8}}
            keyExtractor={callLogKeyExtractor}
            ListHeaderComponent={callLogsListHeader}
            renderItem={callLogRenderItems}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </View>
      )}
    </View>
  );
}
