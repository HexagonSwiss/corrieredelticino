import { NativeModules } from 'react-native';

/**
 * Interfaccia per la configurazione di IubendaService.
 */
interface IubendaConfig {
  gdprEnabled: boolean;
  forceConsent: boolean;
  siteId: string;
  cookiePolicyId: string;
}

/**
 * Classe per interfacciarsi con Iubenda tramite NativeModules.
 */
declare class IubendaService {
  constructor(siteId: string, cookiePolicyId: string);

  /**
   * Inizializza il servizio Iubenda con la configurazione fornita.
   * @returns Una Promise che risolve in `true` se l'inizializzazione è avvenuta con successo, altrimenti `false`.
   */
  initialize(): Promise<boolean>;

  /**
   * Richiede il consenso all'utente.
   */
  askConsent(): void;

  /**
   * Apre le preferenze di consenso dell'utente.
   */
  openPreferences(): void;

  /**
   * Ottiene lo stato attuale del consenso.
   * @returns Una Promise che risolve nello stato del consenso (stringa o altro tipo fornito dal modulo nativo).
   */
  getConsentStatus(): Promise<any>;

  /**
   * Modulo nativo utilizzato per comunicare con Iubenda.
   */
  private IubendaBridge: typeof NativeModules.IubendaBridge;
}

export default IubendaService;
