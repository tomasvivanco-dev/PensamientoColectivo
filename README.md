# Pensamiento Colectivo

Sitio estático (Astro) para publicar **columnas de opinión** y **documentos**, con panel de edición (Decap CMS) en `/admin`. Deploy en Netlify, dominio `pensamientocolectivo.cl`.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Estructura de contenido

| Carpeta | Contenido |
|---|---|
| `src/content/columnas/` | Columnas (Markdown) |
| `src/content/documentos/` | Fichas de documentos; el archivo va en `public/uploads/` |
| `src/content/autores/` | Autores |

Todo se puede editar desde `/admin` o directamente en el repo. `draft: true` oculta una pieza.

## Puesta en marcha

### 1. GitHub
```bash
git init -b main && git add . && git commit -m "Sitio inicial"
gh repo create pensamientocolectivo --private --source=. --push
```
Edita `public/admin/config.yml` y cambia `TU_USUARIO/pensamientocolectivo` por tu repo real.

### 2. Netlify
1. *Add new site → Import an existing project* → elige el repo. Netlify detecta `netlify.toml` (build `npm run build`, publish `dist`).
2. **Domain management → Add a domain** → `pensamientocolectivo.cl`.

### 3. DNS en NIC Chile
- Lo más simple: **delegar los nameservers** a Netlify DNS (los entrega Netlify al agregar el dominio).
- Alternativa: mantener el DNS actual y crear `ALIAS/ANAME` (o `A` a la IP de Netlify) para el apex, y `CNAME www → <tu-sitio>.netlify.app`.
- Luego, en Netlify, **Provision certificate** (HTTPS).

### 4. Login del panel `/admin` (GitHub OAuth)
1. GitHub → *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL: `https://pensamientocolectivo.cl`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. Netlify → *Project configuration → Access & security → OAuth → Install provider* → GitHub, con el Client ID y Secret.
3. Entra a `https://pensamientocolectivo.cl/admin` e inicia sesión con GitHub. Solo podrán publicar las cuentas con permiso de escritura en el repo.

Cada publicación desde el panel hace un commit y Netlify redespliega automáticamente.

## Notas
- Archivos grandes (>50 MB) no son ideales en Git; para eso conviene usar un bucket externo y pegar el enlace en `file`.
- `public/uploads/ejemplo.pdf`, la columna `bienvenida` y el autor `equipo-editorial` son de ejemplo: bórralos cuando quieras.
