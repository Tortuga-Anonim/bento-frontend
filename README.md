# 🐋 Bento Frontend — Chat con Biólogo Marino Experto

Interfaz de chat para interactuar con Bento, un biólogo marino experto impulsado por Gemini AI.

## Características

- UI moderna con temática oceánica (Tailwind CSS).
- Barra de progreso de interacciones (10 niveles).
- Sugerencias rápidas para iniciar conversación.
- Indicador de escritura animado.
- Reinicio de sesión.

## Setup local

```bash
npm install
copy .env.example .env      # Edita VITE_API_URL si es necesario
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## Variables de entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend de Bento | `http://localhost:8000` |

## Build para producción

```bash
npm run build
```

Los archivos estáticos se generan en `dist/`.
