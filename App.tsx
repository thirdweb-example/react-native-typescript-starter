import {
  ConnectWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  smartWallet,
  ThirdwebProvider,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedWallets={[
        metamaskWallet(),
        rainbowWallet(),
        localWallet(),
        smartWallet({
          factoryAddress: '0x9838b534cd5950CB6ea9E7fa94c00CF3986F953B', //'0xe448A5878866dD47F61C6654Ee297631eEb98966', //'0xe448A5878866dD47F61C6654Ee297631eEb98966',
          thirdwebApiKey:
            'b78e9bf42aee33f5484e36a4d8eef9d608a37387d55e3392a37719388a10efc62884edcd1981aace4e27402d2fe5d03accfaaf35b11d0e29946d61dec9b84386',
          gasless: true,
          personalWallets: [metamaskWallet(), localWallet()],
        }),
      ]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyles = {
    color: isDarkMode ? Colors.white : Colors.black,
    ...styles.heading,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.view}>
        <Text style={textStyles}>React Native thirdweb starter</Text>
        <ConnectWallet />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
