# ![logo](https://github.com/ModischFabrications/CutSolverFrontend/raw/master/src/assets/logo.svg) CutSolver (Frontend)

[![CI/CD](https://github.com/ModischFabrications/CutSolverFrontend/actions/workflows/ci.yml/badge.svg)](https://github.com/ModischFabrications/CutSolverFrontend/actions/workflows/ci.yml)
[![Docker Image Version](https://img.shields.io/docker/v/modischfabrications/cutsolver_frontend?sort=semver)](https://hub.docker.com/r/modischfabrications/cutsolver_frontend)
[![Pulls from DockerHub](https://img.shields.io/docker/pulls/modischfabrications/cutsolver_frontend)](https://hub.docker.com/r/modischfabrications/cutsolver_frontend)

This is a simple frontend for [CutSolver](https://github.com/ModischFabrications/CutSolver), my solver backend for ideal stock cutting lengths.

This tool can be used to solve the common problem of finding the perfect placement of cuts for specified lengths.
It seems like no other free service tackles this specific problem in an easy-to-use format, so this is my attempt.

*You are very welcome to share how you use this tool!*

![Showcase](https://github.com/ModischFabrications/CutSolverFrontend/raw/master/docs/mobile.png)

This Solver is using integers exclusively, as there is no need for arbitrary precision (yet).
Feel free to shift your numbers a few decimals if you need fractions.
It has no concept of units, so you can use whatever you want.

*Nerd talk*: This is the 2D "Cutting Stock Problem", which is NP-hard. It can be reduced to the Bin-Packing-Problem (
BPP). No efficient algorithm exists to calculate a perfect solution in an acceptable timeframe, therefore brute force (perfect
solution) is used for small jobs (<10 entries) and FFD (fast solution) für larger ones. Don't be surprised if you get different
results, many combinations have equal trimmings and are therefore seen as equally good.

It's also my first vue project, you should keep looking for better references. 

## Usage

Use the provided service at <https://vps.modisch.me:/cutsolver>, host this service yourself if that isn't available yet. 

Enter the length of your stock, enter the assumed width of your cutting device (e.g. hacksaw with 3mm) and 
enter the number and length that you desire.

## Docker Hosting
Remember to host a [backend instance](https://github.com/ModischFabrications/CutSolver) for yourself! 

Set the backend path by adding a `VUE_APP_BACKEND_SOLVER_URL` to your environment or compose file.
See docker compose for details.

Start that file with `docker-compose up [-d]` and have fun!

## Contributing

Feel free to contact me or make a pull-request if you want to participate.

Remember to set all versions for new releases:
1. git tag
2. package.json
3. Docker Multibuild (might be done by travis eventually)

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

*Make sure to test before committing any updates!*

### Push Production Docker Images

Docker Hub Images should be updated automatically, but feel free to build yourself should everything else fail.
Adding "[skip ci]" to the commit message will prevent any ci builds should the need arise.
Thankfully, local builds are easy with the modern `buildx` workflow.

Installation of a multibuilder (once):

```
docker buildx create --name multibuilder --use
docker buildx inspect multibuilder --bootstrap
```

Build and push the new multi-arch image with the following steps (add version, e.g. v0.3.7):

```
docker login -u modischfabrications
docker buildx build --platform linux/amd64,linux/arm/v7,linux/arm64 -t modischfabrications/cutsolver_frontend:<VERSION> -t modischfabrications/cutsolver_frontend:latest --push .
```

Wait a while for every dependency to build (~600) and all layers to be pushed (~200s). Feel free to drink some water
and be bored, that's healthy from time to time.

Check [Docker Hub](https://hub.docker.com/r/modischfabrications/cutsolver_frontend) to see results.

## Dependencies
*Everything should be handled by Docker and/or NPM.*

This project uses:

- [Vue (2)](https://vuejs.org/): web framework
- [Vue Bootstrap](https://bootstrap-vue.org/): style
- [VueShowdown](https://vue-showdown.js.org/): markdown parsing
- [Eslint](https://eslint.vuejs.org/): linting and code-formatting
- [Jest](https://jestjs.io/): testing
