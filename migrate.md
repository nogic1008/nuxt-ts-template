# MIGRATE GUIDE

## Short Hands

1. Remove `/.dependabot` folder.
1. Remove [README badges](./README.md#L3-8).
1. Remove [Report Code Coverage to codecov step](./.github/workflows/nodejs.yml#L47-50) in Node CI Workflow.
1. Replace `nuxt-ts-template` with `app-name`.
1. Replace `(N|n)ogic` with `Owner Name`.
1. Set your app version to [package.json](./package.json#L3) and [package-lock.json](./package-lock.json#L3).

## TOC

- [Short Hands](#short-hands)
- [README badges](#readme-badges)
- [Package Description](#package-description)
- [License](#license)
- [Services](#services)
  - [dependabot](#dependabot)
  - [codecov](#codecov)
  - [codefactor](#codefactor)
- [GitHub Actions](#github-actions)

## README badges

[Badges in README](./README.md#L3-8) include absolute path depends on this repository.
So you should remove or replace them.

```diff
 3: [![release version](https://img.shields.io/github/v/release/nogic1008/nuxt-ts-template "release version")](https://github.com/nogic1008/nuxt-ts-template/releases)
 4: [![Node CI Status](https://github.com/nogic1008/nuxt-ts-template/workflows/Node%20CI/badge.svg "Node CI Status")](/nogic1008/nuxt-ts-template/actions?query=workflow%3A%22Node+CI%22)
 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
 6: [![CodeFactor](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template/badge)](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template)
 7: [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=nogic1008/nuxt-ts-template)](https://dependabot.com)
 8: [![License](https://img.shields.io/github/license/nogic1008/nuxt-ts-template)](LICENSE)
```

Some badges are provided by third party services. See also [Services](#services) section.

## Package Description

Fix package info to that of your application.

- [package.json#L2-5](./package.json#L2-5)
  ```diff
   1: {
  -2:   "name": "nuxt-ts-template",
  -3:   "version": "1.1.1",
  -4:   "description": "Template",
  -5:   "author": "nogic",
  +2:   "name": "your-app-name",
  +3:   "version": "0.0.1",
  +4:   "description": "Your app description",
  +5:   "author": "Your Name",
  ```
- [package-lock.json#L2-3](./package-lock.json#L2-3)
  ```diff
   1: {
  -2:   "name": "nuxt-ts-template",
  -3:   "version": "1.1.1",
  +2:   "name": "your-app-name",
  +3:   "version": "0.0.1",
  ```

## License

If you keep to use MIT License, change [LICENSE](./LICENSE#L3) signiture and year.
```diff
 1: MIT License
 2: 
-3: Copyright (c) 2020 Nogic
+3: Copyright (c) 2020 Your Name
```

Or replace LICENSE file and [package.json#L7](./package.json#L7) if you want to use another one.

```diff
-7:   "license": "MIT",
+7:   "license": "License Name you choose",
```

## Services

### Dependabot

[Depandabot](https://dependabot.com/) is integrated tool to keep repo's dependencies secure and up-to-date.

#### Disable Dependabot

#### Enable Dependabot

### Codecov

[Codecov](https://codecov.io/) is integrated tool to group, merge, archive and compare coverage reports.

#### Disable Codecov

#### Enable Codecov

### CodeFactor

[CodeFactor](https://www.codefactor.io/) is automated code review tool. 

#### Disable CodeFactor

#### Enable CodeFactor

## GitHub Actions
