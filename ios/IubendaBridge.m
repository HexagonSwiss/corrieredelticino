#import "IubendaBridge.h"
#import "React/RCTLog.h"
#import <iubenda/iubenda-Swift.h>
@implementation IubendaBridge
// This RCT (React) "macro" exposes the current module to JavaScript
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(initialize: (NSDictionary *) config)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    
    @try{
      
      IubendaCMPConfiguration *configuration = [[IubendaCMPConfiguration alloc] init];
      
      if ([config objectForKey:@"gdprEnabled"]) {
        configuration.gdprEnabled = [config objectForKey:@"gdprEnabled"];
      }
      
      if ([config objectForKey:@"forceConsent"]) {
        configuration.forceConsent = [config objectForKey:@"forceConsent"];
      }
      
      if ([config objectForKey:@"googleAds"]) {
        configuration.googleAds = [config objectForKey:@"googleAds"];
      }
      
      if ([config objectForKey:@"siteId"]) {
        configuration.siteId = [config objectForKey:@"siteId"];
      }
      
      if ([config objectForKey:@"cookiePolicyId"]) {
        configuration.cookiePolicyId = [config objectForKey:@"cookiePolicyId"];
      }
      
      if ([config objectForKey:@"cssContent"]) {
        configuration.cssContent = [config objectForKey:@"cssContent"];
      }
      
      if ([config objectForKey:@"jsonContent"]) {
        configuration.jsonContent = [config objectForKey:@"jsonContent"];
      }
      
      if ([config objectForKey:@"cssUrl"]) {
        configuration.cssUrl = [config objectForKey:@"cssUrl"];
      }
      
      if ([config objectForKey:@"applyStyles"]) {
        configuration.applyStyles = [config objectForKey:@"applyStyles"];
      }
      
      if ([config objectForKey:@"acceptIfDismissed"]) {
        configuration.acceptIfDismissed = [config objectForKey:@"acceptIfDismissed"];
      }
      
      if ([config objectForKey:@"skipNoticeWhenOffline"]) {
        configuration.skipNoticeWhenOffline = [config objectForKey:@"skipNoticeWhenOffline"];
      }
      
      if ([config objectForKey:@"preventDismissWhenLoaded"]) {
        configuration.preventDismissWhenLoaded = [config objectForKey:@"preventDismissWhenLoaded"];
      }
      
      if ([config objectForKey:@"csVersion"]) {
        configuration.csVersion = [config objectForKey:@"csVersion"];
      }
      
      if ([config objectForKey:@"proxyUrl"]) {
        configuration.proxyUrl = [config objectForKey:@"proxyUrl"];
      }
      
      if ([config objectForKey:@"portraitWidth"]) {
        configuration.portraitWidth = [[config objectForKey:@"portraitWidth"] integerValue];
      }
      
      if ([config objectForKey:@"portraitHeight"]) {
        configuration.portraitHeight = [[config objectForKey:@"portraitHeight"] integerValue];
      }
      
      if ([config objectForKey:@"landscapeWidth"]) {
        configuration.landscapeWidth = [[config objectForKey:@"landscapeWidth"] integerValue];
      }
      
      if ([config objectForKey:@"landscapeHeight"]) {
        configuration.landscapeHeight = [[config objectForKey:@"landscapeHeight"] integerValue];
      }
    
      [IubendaCMP initializeWith:configuration];
      
    }
    @catch(NSException *exception){
    }
  });
}
@end