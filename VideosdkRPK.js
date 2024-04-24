import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

class VideosdkRPK extends NativeEventEmitter {
  constructor(nativeModule) {
    super(nativeModule);
    this.startBroadcast =
      Platform.OS === 'ios' ? nativeModule.startBroadcast : null;
  }
}

// Use myNativeModule instead of NativeModules.VideosdkRPK
const myNativeModule = NativeModules.VideosdkRPK; // Replace VideosdkRPK with the name of your native module
const eventEmitter = new VideosdkRPK(myNativeModule);

export default eventEmitter;