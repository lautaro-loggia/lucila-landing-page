# Lucila Carro · Wonder Program

Landing page en Next.js 16 + Tailwind v4 + Motion.

## Correr en local

```bash
npm install
npm run dev
```

## Publicar

`npm run build` genera una página 100% estática. Se puede subir a Vercel tal cual.
Definí `NEXT_PUBLIC_SITE_URL` con el dominio final (por ejemplo `https://wonderprogram.com`) para que las imágenes de redes y la URL canónica queden bien.

## Dónde editar

- WhatsApp, redes y mensajes precargados: `src/lib/site.ts`
- Textos de cada sección: `src/components/*.tsx`
- Fotos optimizadas: `public/images/` (máx. 2000 px; Next las sirve en AVIF/WebP)
- Video de SouthFit: `public/video/southfit.mp4`
- Colores de marca: variables al inicio de `src/app/globals.css`
