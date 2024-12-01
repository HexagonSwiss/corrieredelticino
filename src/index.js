import { NativeModules } from 'react-native';

class IubendaService {
  constructor(siteId, cookiePolicyId) {
    this.siteId = siteId;
    this.cookiePolicyId = cookiePolicyId;
    this.IubendaBridge = NativeModules.IubendaBridge;

    // Controllo immediato della disponibilità del moduåçlo nativo
    if (!this.IubendaBridge) {
      console.error('Errore: Il modulo IubendaBridge non è disponibile!');
    }
  }

  // Inizializzazione del servizio
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
  
      // Inizializzazione asincrona
      await this.IubendaBridge.initialize(config);
      console.log('Iubenda inizializzato correttamente.');
      return true;
    } catch (error) {
      console.error('Errore durante l\'inizializzazione di Iubenda:', error);
      return false;
    }
  }

  // Chiedi il consenso
  askConsent() {
    if (!this.IubendaBridge) {
      console.warn('IubendaBridge non disponibile per chiedere il consenso.');
      return;
    }

    try {
      this.IubendaBridge.askConsent();
      console.log('Consenso richiesto.');
    } catch (error) {
      console.error('Errore durante la richiesta di consenso:', error);
    }
  }

  // Recupera lo stato del consenso
  async getConsentStatus() {
    if (!this.IubendaBridge) {
      console.warn('IubendaBridge non disponibile per ottenere lo stato del consenso.');
      return Promise.reject('IubendaBridge non disponibile.');
    }

    try {
      const status = await this.IubendaBridge.getConsentStatus();
      console.log('Stato del consenso:', status);
      return status;
    } catch (error) {
      console.error('Errore durante il recupero dello stato del consenso:', error);
      throw error;
    }
  }
}

export default IubendaService;
