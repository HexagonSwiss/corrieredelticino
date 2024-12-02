import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, NativeModules } from 'react-native';

import IubendaService from './src/index.js';

class App extends Component {
  state = { 
    initialized: false,
    consentStatus: '',  // Stato per memorizzare la consentString
  };

  iubendaService: IubendaService | undefined;
  
  componentDidMount() {
    this.iubendaService = new IubendaService('3782169','66406702');
    let result = this.iubendaService.initialize();

    this.setState({ initialized: result });
  }

  askConsent = () => {
    if(this.iubendaService) this.iubendaService.askConsent();
  };

  consentString = async () => {
    if (this.iubendaService) {
      try {
        const status = await this.iubendaService.getConsentStatus();
        this.setState({ consentStatus: JSON.stringify(status) });
      } catch (error) {
        console.error('Errore durante il recupero dello stato del consenso:', error);
      }
    }
  };

  render() {
    const { initialized, consentStatus } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.status}> {initialized ? 'Inizializzato.' : 'Inizializzazione in corso...'} </Text>
        <Button title="Mostra Consenso" onPress={this.askConsent} />
        <Button title="Mostra consent string" onPress={this.consentString} />
        {consentStatus && <Text style={styles.status}>Consenso: {consentStatus}</Text>}
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
  consentString: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },

});

export default App;
