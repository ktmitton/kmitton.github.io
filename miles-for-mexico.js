/**
 *
 * @param {string} clientId
 * @param {string[]} scopes
 * @returns
 */
const getCachedOAuthToken = async (clientId, scopes) => {
  const cachedToken = localStorage.getItem("gapiToken");

  if (cachedToken !== null) {
    return JSON.parse(cachedToken);
  }

  return await getOAuthToken(clientId, scopes);
};

/**
 *
 * @param {string} clientId
 * @param {string[]} scopes
 * @returns
 */
const refreshOAuthToken = (clientId, scopes) => getOAuthToken(clientId, scopes, "");

/**
 *
 * @param {string} clientId
 * @param {string[]} scopes
 * @returns
 */
const getOAuthToken = async (clientId, scopes, prompt = "consent") => {
  return await new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: scopes.join(" "),
      callback: (/** @type {{ access_token: string; }} */ tokenResponse) => {
        if (tokenResponse && tokenResponse.access_token) {
          localStorage.setItem("gapiToken", JSON.stringify(tokenResponse));
          resolve(tokenResponse.access_token);
        } else {
          reject(tokenResponse);
        }
      },
    });

    tokenClient.requestAccessToken({prompt});
  });
};

/**
 *
 * @param {string} clientId
 * @param {string} apiKey
 * @param {string[]} scopes
 * @param {string[]} discoveryDocs
 * @returns {Promise}
 */
const initializeGoogleApiClient = (clientId, apiKey, scopes, discoveryDocs) => {
  return new Promise((resolve) => {
    gapi.load("client", async () => {
      const initTask = gapi.client.init({
        apiKey,
        discoveryDocs,
      });
      const token = await getCachedOAuthToken(clientId, scopes);

      await initTask;
      gapi.client.setToken(token);

      resolve(null);
    });
  });
};

await globalThis.loadGoogleScriptsTask;

const CLIENT_ID = "339276363047-k52mkf39fe28d8j13kah8bmtpk0doehl.apps.googleusercontent.com";
const API_KEY = "AIzaSyCaOkfOlCoiLPrgGUgRF4mYIjGjH-8plw8";
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4", "https://www.googleapis.com/discovery/v1/apis/oauth2/v1/rest"];
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

await initializeGoogleApiClient(CLIENT_ID, API_KEY, SCOPES, DISCOVERY_DOCS);

const request = {
  spreadsheetId: "1TgwZSql7rRbP-E7Fs6_jZ2DifwZ82kpnZoV5MfkW_UI",
  range: "2024!A:E",
  valueInputOption: "USER_ENTERED",
  insertDataOption: 'INSERT_ROWS',
  resource: {
      "majorDimension": "ROWS",
      "values": [
          ["Ken", "Walk", "5", "Miles", "test row"],
      ]
  },
};
const result = await gapi.client.sheets.spreadsheets.values.append(request);

debugger;

export {};
