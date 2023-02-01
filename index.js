/**
 * @format
 */
// Step 1: Import the crypto shim for walletconnect
import 'crypto';

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import '@ethersproject/shims';

// Step 3: Import react-native-compat for walletconnect
import '@walletconnect/react-native-compat';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
