# AgenteMoto — Frontend de demostración

Dashboard comercial para la gestión de pólizas de seguros. Esta versión está preparada como demo de portafolio: utiliza datos locales en JSON y no requiere que el backend esté publicado.

## Tecnologías

- React 19
- Vite
- Lucide React
- CSS personalizado
- Datos locales en `src/data/policies.json`

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilación

```bash
npm run build
```

## Publicación en Vercel

Al importar este repositorio en Vercel, configura:

- Branch: `feature/frontend-portfolio`
- Root Directory: `src/frontend`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Esta demo funciona completamente en el navegador y no necesita variables de entorno.
