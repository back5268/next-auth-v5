/**
 * An array of routes that are accessible to the public
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
