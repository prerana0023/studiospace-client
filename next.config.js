/** Proxy /api/* to the Express server so the HTTPOnly JWT cookie is first-party (works on reload + in all browsers). */
module.exports = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${process.env.API_URL || 'http://localhost:5000'}/api/:path*` }];
  },
};
