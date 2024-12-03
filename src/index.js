import { NativeModules } from 'react-native';
 
class IubendaService {
  constructor(siteId, cookiePolicyId) {
    this.siteId = siteId;
    this.cookiePolicyId = cookiePolicyId;
    this.IubendaBridge = NativeModules.IubendaBridge;

    if (!this.IubendaBridge) {
      console.error('Errore: Il modulo IubendaBridge non è disponibile!');
    }
  }

  initialize() {
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

  askConsent() {
    if (!this.IubendaBridge) {
      console.warn('IubendaBridge non disponibile per chiedere il consenso.');
      return;
    }
 
    try {
      this.IubendaBridge.askConsent();
    } catch (error) {
      console.error('Errore durante il recupero dello stato del consenso:', error);
      throw error;
    }
  }
}
 
export default IubendaService;
 