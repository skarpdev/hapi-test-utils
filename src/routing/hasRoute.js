/**
 * Function to determine whether the hapi server table contains a given route
 * @param {Server} server The hapi server instance
 * @param {string} path The route path to search for
 * @param {string} method The route's HTTP method / verb
 */
const hasRoute = (server, path, method) => {
  let foundRoute = false;

  server.table().forEach((route) => {
    if (route.path === path && route.method.toLowerCase() === method.toLowerCase()) {
      foundRoute = true;
    }
  });

  return foundRoute;
};

module.exports = hasRoute;
