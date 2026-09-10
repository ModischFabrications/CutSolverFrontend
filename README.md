# ![logo](https://github.com/ModischFabrications/CutSolverFrontend/raw/main/src/assets/logo.svg) CutSolver (Frontend)

[![CI/CD](https://github.com/ModischFabrications/CutSolverFrontend/actions/workflows/ci.yml/badge.svg)](https://github.com/ModischFabrications/CutSolverFrontend/actions/workflows/ci.yml)
[![Docker Image Version](https://img.shields.io/docker/v/modischfabrications/cutsolver_frontend?sort=semver)](https://hub.docker.com/r/modischfabrications/cutsolver_frontend)
[![Pulls from DockerHub](https://img.shields.io/docker/pulls/modischfabrications/cutsolver_frontend)](https://hub.docker.com/r/modischfabrications/cutsolver_frontend)

This is a simple frontend for [CutSolver](https://github.com/ModischFabrications/CutSolver), my solver backend for ideal stock cutting lengths.

This tool can be used to solve the common problem of finding the perfect placement of cuts for specified lengths.
It seems like no other free service tackles this specific problem in an easy-to-use format, so this is my attempt.

_You are very welcome to share how you use this tool!_

![Showcase](https://github.com/ModischFabrications/CutSolverFrontend/raw/main/docs/mobile.png)

This Solver is using integers exclusively, as there is no need for arbitrary precision (yet).
Feel free to shift your numbers a few decimals if you need fractions.
It has no concept of units, so you can use whatever you want.

_Nerd talk_: This is the 2D "Cutting Stock Problem", which is NP-hard. It can be reduced to the Bin-Packing-Problem (
BPP). No efficient algorithm exists to calculate a perfect solution in an acceptable timeframe, therefore brute force (perfect
solution) is used for small jobs (<10 entries) and FFD (fast solution) for larger ones. When multiple solutions yield equal total trimmings, the solver breaks ties deterministically to favor larger, reusable scrap pieces over fragmented cut-offs.

It's also my first vue project, you should keep looking for better references.

## Usage

Use the provided service at <https://cutsolver.modisch.me>, host this service yourself if you want to waste an hour of your time.

Enter the length of your stock, enter the assumed width of your cutting device (e.g. hacksaw with 3mm) and
enter the number and length that you desire.

## Docker Hosting

### Production Deployment

1. **Copy environment template**

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your values:

   ```
   DOMAIN_NAME=cutsolver.modisch.me
   EMAIL_ADDRESS=your-email@example.com
   ```

3. **Start containers**

   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

4. **Reload Caddy**
   ```bash
   docker exec caddy caddy reload
   ```

Ports 80/443 must be available on the host.

---

### Development / Self-Hosting

Remember to host a [backend instance](https://github.com/ModischFabrications/CutSolver) for yourself!

Set the backend path by adding a `VUE_APP_BACKEND_SOLVER_URL` to your environment or compose file.
See docker compose for details.

> **Note on backend URL substitution & routing**:
> - In the Docker image, `entrypoint.sh` runs `envsubst` to replace the literal string `$VUE_APP_BACKEND_SOLVER_URL` in the compiled JS bundle (`/usr/share/nginx/html/js/app.*.js`) before starting Nginx.
> - In `src/App.vue`, trailing slashes are automatically sanitized (`cleanBaseUrl = this.solverUrl.replace(/\/+$/, '')`) so API routes (e.g. `/solve`) resolve cleanly regardless of whether the environment variable has a trailing slash.

Start that file with `docker-compose up [-d]` and have fun!

## Contributing

Feel free to contact me or make a pull-request if you want to participate.
Do look through open issues, you might see one you can help with.

### Release & Versioning

1. Update `version` in both `package.json` and `package-lock.json`.
2. Commit your changes and tag manually:
   ```bash
   git tag vX.Y.Z
   git push origin main
   git push origin vX.Y.Z
   ```
GitHub Actions CI will automatically run unit tests, compile the Vue SPA bundle, and build/publish multi-arch Docker images (`linux/amd64,linux/arm64`) to Docker Hub (`modischfabrications/cutsolver_frontend:<VERSION>`) and GHCR. Note: 32-bit ARM (`linux/arm/v7`) is retired.

### Build & Dev Environment

I assume you know what you are doing if you want to develop and install it manually.

Here are some hints for you if you need some help regardless:

- Initial setup: `npm install`
- Compiles and hot-reloads for development:: `npm run serve`
- Compiles and minifies for production: `npm run build`
- Run Linter: `npm run lint`
- Run Tests: `npm run test:unit`

### Updates

Update all dependencies completely with `vue upgrade && npm install` whenever possible, webdev is perpetually broken.
`npm outdated` in combination with `npm install TODO@latest` can be used to migrate to new major versions.

_Make sure to test before committing any updates!_

### Docker

Prebuilt multi-arch images (`linux/amd64,linux/arm64`) are built and published automatically to Docker Hub and GHCR upon pushing a release tag.

For local production container builds:
```bash
docker build -t modischfabrications/cutsolver_frontend:local .
```

## Dependencies

_Everything should be handled by Docker and/or NPM._

This project uses:

- [Vue (2)](https://vuejs.org/): web framework
- [Vue Bootstrap](https://bootstrap-vue.org/): style
- [VueShowdown](https://vue-showdown.js.org/): markdown parsing
- [Eslint](https://eslint.vuejs.org/): linting and code-formatting
- [Jest](https://jestjs.io/): testing
