export default {
  disableCookies: {
    parse: false,
    failAction: 'log'
  },
  enableCookies: {
    parse: true,
    failAction: 'error'
  },
  encryptedCookies (isSecure) {
    return {
      isSecure: isSecure,
      isSameSite: 'Lax',
      encoding: 'iron',
      clearInvalid: true,
      password: process.env.SESSION_SECRET,
      ttl: null, // session cookie
    };
  }
};
