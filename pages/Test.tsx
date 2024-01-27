import React, {useEffect} from 'react';
import {Button, Linking} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import {View} from '../components/Themed';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const Test = () => {
  let callDetector: {dispose: () => any};

  useEffect(() => {
    startListener();

    return () => {
      stopListener();
    };
  }, []);

  const startListener = () => {
    callDetector = new CallDetectorManager(
      (event: string, phoneNumber: any) => {
        console.log(event, 'first', phoneNumber);
        if (event === 'Disconnected') {
          // Do something call got disconnected
        } else if (event === 'Connected') {
          // Do something call got connected
        } else if (event === 'Incoming') {
          // Do something call got incoming
        } else if (event === 'Dialing') {
          // Do something call got dialing
        } else if (event === 'Offhook') {
          // Device call state: Off-hook.
          // This clause will only be executed for Android
        } else if (event === 'Missed') {
          // Do something call got missed
        }
      },
      false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {
        console.error('Permission denied');
      },
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react to incoming calls.',
      },
    );
  };

  const stopListener = () => {
    callDetector && callDetector.dispose();
  };

  const callFriend = () => {
    // Add the telephone num to call
    RNImmediatePhoneCall.immediatePhoneCall('198');
  };

  return (
    // Your component JSX here
    <View>
      {/* Example usage */}
      <Button title="Call Friend" onPress={callFriend} />
    </View>
  );
};

export default Test;
