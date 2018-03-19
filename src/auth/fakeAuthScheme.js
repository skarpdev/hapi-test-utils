const path = require('path');
const Hoek = require('hoek');
const { version } = require(path.join('..', '..', 'package.json'));
const internals = {};

const register = async (plugin) => {
  plugin.auth.scheme('fake', internals.implementation);
};
internals.implementation = function (server, options) {

  Hoek.assert(options, 'Missing fake auth strategy options');
  Hoek.assert(typeof options.credentialsFn === 'function', 'options.credentialsFn must be a valid function in fake scheme');

  const settings = Hoek.clone(options);

  const scheme = {
    authenticate: function (request, h) {
      return h.authenticated({ credentials: settings.credentialsFn() });
    }
  };

  return scheme;
};

module.exports = {
  register,
  version,
  name: 'hapi-test-utils-fake-auth'
};
