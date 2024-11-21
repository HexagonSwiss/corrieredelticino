#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <iubenda/iubenda-Swift.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"corrieredelticino";

  // let config = IubendaCMPConfiguration()
  // config.gdprEnabled = true
  // config.googleAds = true
  // config.siteId = "12341234"
  // config.cookiePolicyId = "56785678"
  // config.applyStyles = true
  // config.cssFile = Bundle.main.path(forResource: "custom_style", ofType: "css")
  // config.jsonFile = Bundle.main.path(forResource: "config", ofType: "json")
  // IubendaCMP.initialize(with: config)

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
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
