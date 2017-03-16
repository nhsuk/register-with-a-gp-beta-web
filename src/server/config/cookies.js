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
      name: 'data',
      options: {
        isSecure: isSecure,
        isSameSite: 'Lax',
        encoding: 'iron',
        clearInvalid: true,
        password: process.env.SESSION_SECRET,
        ttl: 20 * 60 * 1000 // twenty minutes
      }
    };
  }
};
