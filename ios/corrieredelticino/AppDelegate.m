#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <iubenda/iubenda-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"corrieredelticino";

  // Inizializzazione Iubenda
  IubendaCMPConfiguration *config = [[IubendaCMPConfiguration alloc] init];
  config.gdprEnabled = YES;
  config.googleAds = YES;
  config.siteId = @"3841561";
  config.cookiePolicyId = @"47605511";
  config.applyStyles = YES;
  config.cssFile = [[NSBundle mainBundle] pathForResource:@"custom_style" ofType:@"css"];
  config.jsonFile = [[NSBundle mainBundle] pathForResource:@"config" ofType:@"json"];
  
  [IubendaCMP initializeWithConfiguration:config];

  // Passaggio delle props iniziali
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
