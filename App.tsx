// Step 1: Import the crypto getRandomValues shim (**BEFORE** the ethers shims)
import "react-native-get-random-values";

// Step 2: Import the ethers shims (**BEFORE** the thirdweb SDK)
import "@ethersproject/shims";

// Step 3: Import the thirdweb SDK

import { StatusBar } from "expo-status-bar";
import {
  Button,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./components/Card";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://thirdweb.com")}
        >
          <Text style={styles.title}>Welcome to thirdweb</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          <Card
            description="Guides, references and resources that will help you build with
                thirdweb."
            link="https://portal.thirdweb.com"
            title="Portal"
          />
          <Card
            description="Deploy, configure and manage your smart contracts from the
                dashboard."
            link="https://thirdweb.com/dashboard"
            title="Dashboard"
          />

          <Card
            description="Discover and clone template projects showcasing thirdweb
                features."
            link="https://portal.thirdweb.com/templates"
            title="Templates"
          />
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
});
