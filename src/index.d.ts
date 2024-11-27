declare module 'hexagonswiss-react-native-iubenda-tcf' {
    /**
     * Configurazione per l'inizializzazione del servizio Iubenda.
     */
    interface IubendaConfig {
      gdprEnabled: boolean;
      forceConsent: boolean;
      siteId: string;
      googleAds: boolean;
      applyStyles: boolean;
      cookiePolicyId: string;
      acceptIfDismissed: boolean;
      preventDismissWhenLoaded: boolean;
      jsonContent: string;
      skipNoticeWhenOffline: boolean;
    }
  
    /**
     * Classe principale per il servizio Iubenda.
     */
    export default class IubendaService {
      /**
       * Crea un'istanza di IubendaService.
       * @param siteId L'ID del sito associato a Iubenda.
       * @param cookiePolicyId L'ID della politica sui cookie.
       */
      constructor(siteId: string, cookiePolicyId: string);
  
      /**
       * Inizializza il servizio Iubenda con la configurazione specificata.
       * @returns `true` se l'inizializzazione ha avuto successo, altrimenti `false`.
       */
      initialize(): boolean;
  
      /**
       * Richiede il consenso dell'utente.
       */
      askConsent(): void;
  
      /**
       * Recupera lo stato del consenso degli utenti.
       * @returns Una promessa che restituisce i dati dello stato del consenso.
       */
      getConsentStatus(): Promise<any>;
  
      /**
       * Verifica se l'utente ha dato il consenso per uno scopo specifico.
       * @param purposeId L'ID dello scopo.
       * @returns Una promessa che restituisce `true` se l'utente ha dato il consenso, altrimenti `false`.
       */
      // hasConsentForPurpose(purposeId: string): Promise<boolean>;
    }
  }
  