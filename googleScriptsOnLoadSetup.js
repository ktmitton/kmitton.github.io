globalThis.loadGoogleScriptsTask = new Promise(resolve => {
  let isGoogleApiScriptLoaded = false;
  let isGoogleIdentityServicesScriptLoaded = false;

  globalThis.onGoogleIdentityServicesScriptLoaded = () => {
    isGoogleIdentityServicesScriptLoaded = true;

    checkIfAllScriptsAreLoaded();
  };

  globalThis.onGoogleApiScriptLoaded = () => {
    isGoogleApiScriptLoaded = true;

    checkIfAllScriptsAreLoaded();
  };

  const checkIfAllScriptsAreLoaded = () => {
    if (isGoogleApiScriptLoaded && isGoogleIdentityServicesScriptLoaded) {
      resolve(null);
    }
  };
});
