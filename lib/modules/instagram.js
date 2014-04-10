var ig = require('instagram-node').instagram();

//ig.use({ access_token: '8e7eb9b4c24546e4b3dd2be5b4f68446' });
ig.use({ client_id: '8e7eb9b4c24546e4b3dd2be5b4f68446',
    client_secret: 'cb51e001279946c4bd0ff157930c1836' });

module.exports = ig;