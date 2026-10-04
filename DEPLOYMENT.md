# Netlify deployment

Netlify builds the Vite frontend from the `frontend` directory using `npm run build` and publishes `frontend/dist`. The redirect in `netlify.toml` sends direct visits to React Router pages back to the SPA entry point.

## Required services and settings

The Express API and MongoDB database must be hosted separately; Netlify hosts only this frontend. Configure this variable in Netlify:

- `VITE_API_URL`: the public HTTPS origin of the deployed API, such as `https://api.example.com` (no trailing slash).

Configure these on the API host:

- `FRONTEND_URL`: the exact public frontend origin, such as `https://example.netlify.app`. Multiple allowed origins may be comma-separated.
- `NODE_ENV=production`
- Existing application secrets and service credentials: `MONGO_URI`, `SECRET_KEY`, and Cloudinary credentials.

The API must use HTTPS. Login cookies are cross-site in this split deployment and therefore use `SameSite=None; Secure` in production. For custom domains, set `FRONTEND_URL` to the actual frontend origin.
