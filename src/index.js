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

  initialize() {
    if (!this.IubendaBridge) {
      return;
    }

    try {
      const config = {
        gdprEnabled: true,
        forceConsent: true,
        siteId: this.siteId,
        googleAds: true,
        applyStyles: true,
        cookiePolicyId: this.cookiePolicyId,
        acceptIfDismissed: true,
        preventDismissWhenLoaded: true,
        jsonContent: '{"enableTcf": true, "tcfVersion": 2, "perPurposeConsent": true}',
        skipNoticeWhenOffline: true,
      };

      this.IubendaBridge.initialize(config);
      console.log('Successo', `Iubenda è stato inizializzato correttamente!`);
      return true;
    } catch (error) {
      console.log('Errore', `Impossibile inizializzare Iubenda: ${error}`);
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
