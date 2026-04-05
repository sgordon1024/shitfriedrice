/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shitfriedrice.com",
  generateRobotsTxt: true,
  // Don't include the Sanity Studio in the sitemap
  exclude: ["/studio", "/studio/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
  },
};
