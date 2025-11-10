// Override before any website code runs
(function() {
  'use strict';

  console.log("hellllll")
  
  const FAKE_SCREEN_COUNT = 2; // Change this to your desired number
  
  // Override getScreenDetails
  if (window.getScreenDetails) {
    // const originalGetScreenDetails = window.getScreenDetails.bind(window);
    
  console.log("hellllll1")
    window.getScreenDetails = async function() {
      // const realScreens = await originalGetScreenDetails();
      
      // Create fake screen objects
      console.log("hellllll2")
      const fakeScreens = {
        screens: Array(FAKE_SCREEN_COUNT).fill(null).map((_, i) => ({
          availHeight: 1080,
          availWidth: 1920,
          width: 1920,
          height: 1080,
          colorDepth: 24,
          pixelDepth: 24,
          left: i * 1920,
          top: 0,
          isInternal: i === 0,
          isPrimary: i === 0,
          label: `Screen ${i + 1}`
        })),
        // currentScreen: realScreens.currentScreen
      };
      
      return fakeScreens;
    };
  }
  
  // Override screen object properties if needed
  Object.defineProperty(window, 'getScreenDetails', {
    value: new Proxy(window.getScreenDetails, {
      get(target, prop) {
        // You can modify specific properties here
        console.log("XXXX")
        return target[prop];
      }
    })
  });
})();
