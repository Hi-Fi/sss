# sss

Application for storing and showing (drinking) songs and printing leaflets of those.

SSS is abbreviation of "Sitsitsit" (_table party now_ / _now table party_).

## Running locally

Easiest way to run the app is with Docker compose: `docker-compose up`.
It will start:
- Golang backends (core and print) with hot reloading
- React UI with hot reloading
- Google Datastore emulator for data storage (without persisting of data
between runs)
- Datastore-viewer that allows to see data stored

Code of specific service's (core, print, frontend) is mounted to started
container, so it's easy to develop apps without need to install specific
versions of Node or Golang.

Datastore's project is `dummy-emulator-datastore-project` that comes from Golang
Datastore SDK. When running in real environment, app would automatically recognize
project from credentials.

## Running at cloud

Services are planned to be deployed to Google Cloud Platforms (GCP) App engine,
and currently Datastore is only supported storaga backend.
