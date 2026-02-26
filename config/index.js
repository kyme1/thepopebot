/**
 * Next.js config wrapper for open-ohcode.
 * Enables instrumentation hook for cron scheduling on server start.
 *
 * Usage in user's next.config.mjs:
 *   import { withThepopebot } from 'open-ohcode/config';
 *   export default withThepopebot({});
 *
 * @param {Object} nextConfig - User's Next.js config
 * @returns {Object} Enhanced Next.js config
 */
export function withThepopebot(nextConfig = {}) {
  return {
    ...nextConfig,
    distDir: process.env.NEXT_BUILD_DIR || '.next',
    serverExternalPackages: [
      ...(nextConfig.serverExternalPackages || []),
      'better-sqlite3',
      'drizzle-orm',
    ],
  };
}
