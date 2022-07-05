import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import RootNavigator from './src/navigations/RootNavigator'
import 'react-native-gesture-handler'
import { CurrentLocationContextProvider, DestinationLocationContextProvider } from './src/contexts/context'

//With this, we can now just pass an array of context providers and they will be combined from left to right.
const combineContexts = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

export const AppContextProvider = combineContexts(
  CurrentLocationContextProvider,
  DestinationLocationContextProvider
);

const App = () => {
  return (
    <AppContextProvider>
      <SafeAreaView style={styles.container}>
        <RootNavigator />
      </SafeAreaView>
    </AppContextProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})