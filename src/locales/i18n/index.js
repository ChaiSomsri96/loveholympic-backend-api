export const locale = {
  en: 'en',
  vi: 'vi',
};

export const localeList = Object.values(locale);

export const getContentLanguage = function (req, locales = localeList) {
  const language =
    req.headers['content-language'] ||
    req.headers['Content-Language'] ||
    req.headers['x-localization'] ||
    req.headers['X-localization']

  return locales.includes(language) ? language : locale.en;
};
