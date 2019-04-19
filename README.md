# BRANDr.app website

## Starting the BRANDr docker-compose stack
The `docker-compose` stack of BRANDr consists of two containers: *brandr-api* and *brandr-app*.

Because you can use the API without the website, and not the other way around, the `docker-compose.yml` of the website contains the volumes of the API for development purposes. This enables a developer to deploy the website and API in one command. However, feel free to fire up the two projects separately.

Fire up the dev stack using docker-compose:
```bash
docker-compose -f .\docker-compose.yml -f ..\brandr-api\docker-compose.yml -f .\docker-compose.dev.yml up -d --force-recreate --remove-orphans
```
Or deploy the full stack with a the combined compose file:

```bash
docker-compose -f docker-compose.full.yml -d --force-recreate --remove-orphans
```
