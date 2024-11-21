import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, NativeModules } from 'react-native';



class App extends Component {
  state = {
    initialized: false, // Stato per verificare se Iubenda è inizializzato
  };

  componentDidMount() {
    const { IubendaBridge } = NativeModules;

    if (!IubendaBridge) {
      Alert.alert('Errore', 'Il modulo IubendaBridge non è disponibile!');
      return;
    }

    try {
      // Configurazione da passare al modulo
      const config = {
        gdprEnabled: true,
        forceConsent: true,
        siteId: '3782169',
        googleAds: true,
        applyStyles: true,
        cookiePolicyId: '66406702',
        acceptIfDismissed: true,
        preventDismissWhenLoaded: true,
        jsonContent: '{"enableTcf": true, "tcfVersion": 2, "perPurposeConsent": true}',
        skipNoticeWhenOffline: true,
      };

      // Inizializzazione della CMP tramite il modulo nativo
      IubendaBridge.initialize(config);

      this.setState({ initialized: true });
      Alert.alert('Successo', 'Iubenda è stato inizializzato correttamente!');
    } catch (error) {
      Alert.alert('Errore', `Impossibile inizializzare Iubenda: ${error}`);
    }
  }

  askConsent = () => {
    const IubendaBridge = NativeModules.IubendaBridge;

    if (!IubendaBridge) {
      Alert.alert('Errore', 'Il modulo IubendaBridge non è disponibile!');
      return;
    }

    try {
      IubendaBridge.askConsent();
    } catch (error) {
      Alert.alert('Errore', `Impossibile chiedere il consenso: ${error}`);
    }
  };

  render() {
    const { initialized } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.status}>
          {initialized
            ? 'Iubenda è stato inizializzato correttamente.'
            : 'Inizializzazione in corso...'}
        </Text>
        <Button title="Mostra Consenso" onPress={this.askConsent} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: '#666',
  },
});

export default App;
