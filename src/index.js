import { NativeModules, Alert } from 'react-native';

class IubendaService {
  constructor(siteId, cookiePolicyId) {
    this.siteId = siteId;
    this.cookiePolicyId = cookiePolicyId;
    this.IubendaBridge = NativeModules.IubendaBridge;

    if (!this.IubendaBridge) {
      Alert.alert('Errore', 'Il modulo IubendaBridge non è disponibile!');
    }
  }

  //  getConsentStatus() {
  //   if (!this.IubendaBridge) {
  //     console.warn('IubendaBridge non disponibile.');
  //     return Promise.reject('IubendaBridge non disponibile.');
  //   }

  //   return this.IubendaBridge.getConsentStatus()
  //     .then(data => {
  //       console.log('Dati del consenso:', data);
  //       return data;
  //     })
  //     .catch(error => {
  //       console.error('Index: Errore durante il recupero dello stato del consenso:', error);
  //       throw error;
  //     });
  // }

  // hasConsentForPurpose(purposeId) {
  //   if (!this.IubendaBridge) {
  //     console.warn('IubendaBridge non disponibile.');
  //     return Promise.reject('IubendaBridge non disponibile.');
  //   }

  //   return this.IubendaBridge.hasConsentForPurpose(purposeId)
  //     .then(hasConsent => {
  //       console.log(`Consenso per lo scopo ${purposeId}: ${hasConsent}`);
  //       return hasConsent;
  //     })
  //     .catch(error => {
  //       console.error(`Errore durante la verifica del consenso per lo scopo ${purposeId}:`, error);
  //       throw error;
  //     });
  // }
  async initialize() {
    if (!this.IubendaBridge) {
      console.error('IubendaBridge non disponibile.');
      return false;
    }
  
    try {
      const config = {
        gdprEnabled: true,
        forceConsent: true,
        siteId: this.siteId,
        cookiePolicyId: this.cookiePolicyId,
      };
  
      await this.IubendaBridge.initialize(config); // Assumendo che `initialize` supporti la gestione asincrona.
      console.log('Iubenda inizializzato correttamente.');
      return true;
    } catch (error) {
      console.error('Errore durante l\'inizializzazione:', error);
      return false;
    }
  }
  

  askConsent() {
    if (!this.IubendaBridge) {
      return;
    }

    try {
      this.IubendaBridge.askConsent();
    } catch (error) {
      Alert.alert('Errore', 'Impossibile chiedere il consenso: ${error}');
    }
  }
}

export default IubendaService;
