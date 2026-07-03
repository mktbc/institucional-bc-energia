/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  env: {
    SALESFORCE_API: process.env.SALESFORCE_API,
    BLOG_API: process.env.BLOG_API,
    API: process.env.API,
    WHATSAPP_LINK_PARCERIAS: process.env.WHATSAPP_LINK_PARCERIAS,
    WHATSAPP_LINK_COMPRAS: process.env.WHATSAPP_LINK_COMPRAS,
    RDSTATION_TRACKING_CODE_SCRIPT_URL: process.env.RDSTATION_TRACKING_CODE_SCRIPT_URL,
    VAGAS_URL: process.env.VAGAS_URL
  }
}

export default nextConfig
