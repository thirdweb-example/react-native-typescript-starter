// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";

// Step 3: Import the thirdweb SDK

import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [nfts, setNFTS] = useState<NFT[]>([]);
  useEffect(() => {
    const sdk = new ThirdwebSDK("goerli");
    const loadNFTS = async () => {
      const contract = await sdk.getContract(
        "0x9E7945873C945fB0cdd438c3a9cC55a825C5677D"
      );
      return await contract.erc721.getAll();
    };

    loadNFTS().then((_nfts) => {
      setNFTS(_nfts);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://thirdweb.com")}
        >
          <Text style={styles.title}>Welcome to thirdweb</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          {nfts.map((nft, i) => (
            <TouchableOpacity
              onPress={() =>
                // @ts-ignore
                Linking.openURL(nft?.metadata?.attributes[i].value)
              }
              key={nft.metadata.id}
            >
              <Image
                style={styles.image}
                source={{
                  uri: nft.metadata?.image as string,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1318",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f213a4",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100%",
    marginTop: 16,
  },
  image: {
    borderRadius: 10,
    margin: 8,
    width: 400,
    height: 75,
  },
});
