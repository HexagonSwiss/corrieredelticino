import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, NativeModules } from 'react-native';

import IubendaService from './src';

class App extends Component {
  state = { initialized: false };

  iubendaService: IubendaService | undefined;
  
  componentDidMount() {
    this.iubendaService = new IubendaService('3782169','66406702');
    let result = this.iubendaService.initialize();

    this.setState({ initialized: result });
  }

  askConsent = () => {
    if(this.iubendaService) this.iubendaService.askConsent();
  };

  render() {
    const { initialized } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.status}> {initialized ? 'Inizializzato.' : 'Inizializzazione in corso...'} </Text>
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
