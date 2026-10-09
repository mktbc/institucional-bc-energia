/// <reference types="vite/client" />

// Estilos do Swiper importados como efeito colateral (sem tipos próprios).
declare module 'swiper/css'
declare module 'swiper/css/pagination'
declare module 'swiper/css/navigation'

/** Ambiente de SEO resolvido no build (vite.config.ts → src/config/seoEnv.ts). */
declare const __SEO_ENV__: 'production' | 'preview'
