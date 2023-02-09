import browser from 'webextension-polyfill';
import allLocales from '../../_locales/index.json';

// mapping some browsers return hyphen instead underscore in locale codes (e.g. zh_TW -> zh-tw)
const existingLocaleCodes = {};
allLocales.forEach((locale) => {
  if (locale && locale.code) {
    existingLocaleCodes[locale.code.toLowerCase().replace('_', '-')] =
      locale.code;
  }
});

/**
 * Returns a preferred language code, based on settings within the user's browser. If we have no translations for the
 * users preferred locales, 'en' is returned.
 *
 * @returns {Promise<string>} Promises a locale code, either one from the user's preferred list that we have a translation for, or 'en'
 */
export default async function getFirstPreferredLangCode() {
  let userPreferredLocaleCodes;

  try {
    userPreferredLocaleCodes = await browser.i18n.getAcceptLanguages();
  } catch (e) {
    console.log('[user preferred localeCodes error]', e);
    // Brave currently throws when calling getAcceptLanguages, so this handles that.
    userPreferredLocaleCodes = [];
  }
  console.log('[user preferred localeCodes]', userPreferredLocaleCodes);

  // safeguard for Brave Browser until they implement chrome.i18n.getAcceptLanguages
  // https://github.com/MetaMask/metamask-extension/issues/4270
  if (!userPreferredLocaleCodes) {
    userPreferredLocaleCodes = [];
  }

  let firstPreferredLangCode = userPreferredLocaleCodes
    .map((code) => code.toLowerCase().replace('_', '-'))
    .find(
      (code) =>
        existingLocaleCodes[code] !== undefined ||
        existingLocaleCodes[code.split('-')[0]] !== undefined,
    );

  // if we have matched against a code with a '-' present, meaning its a regional
  // code for which we have a non-regioned locale, we need to set firstPreferredLangCode
  // to the correct non-regional code.
  if (
    firstPreferredLangCode !== undefined &&
    existingLocaleCodes[firstPreferredLangCode] === undefined
  ) {
    firstPreferredLangCode = firstPreferredLangCode.split('-')[0];
  }
  console.log('[firstPreferredLangCode]', firstPreferredLangCode);

  return existingLocaleCodes[firstPreferredLangCode] || 'en';
}