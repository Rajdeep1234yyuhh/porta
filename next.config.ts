import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' fonts.gstatic.com fonts.googleapis.com",
      "connect-src 'self' fonts.googleapis.com fonts.gstatic.com",
      "frame-src youtube.com www.youtube.com youtu.be",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const immutableCache = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
    {
      source: "/images/(.*)",
      headers: immutableCache,
    },
    {
      source: "/fonts/(.*)",
      headers: immutableCache,
    },
    {
      source: "/_next/static/(.*)",
      headers: immutableCache,
    },
  ],
};

export default nextConfig;
