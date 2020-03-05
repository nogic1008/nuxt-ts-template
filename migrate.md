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
  - [Dependabot](#dependabot)
  - [Codecov](#codecov)
  - [CodeFactor](#codefactor)
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

1. Delete `/.dependabot` folder and files.
1. Remove Dependabot badge in [README](./README.md#L7).
    ```diff
    - 7: [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=nogic1008/nuxt-ts-template)](https://dependabot.com)
    ```

#### Enable Dependabot

1. Edit [.dependabot/config.yml](./.dependabot/config.yml) according to your strategy.
    - **Be sure to change the `default_reviewers` section.** If you leave it as is, review requests will come to me.
    - [Click here](https://dependabot.com/docs/config-file/) for configuration file documentation.
1. Sign up from [Dependabot web page](https://dependabot.com/).
1. Install [Dependabot Preview](https://github.com/marketplace/dependabot-preview) GitHub App.
1. Change Dependabot badge URL in [README](./README.md#L7).
    ```diff
    - 7: [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=nogic1008/nuxt-ts-template)](https://dependabot.com)
    + 7: [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=owner/repo)](https://dependabot.com)
    ```

### Codecov

[Codecov](https://codecov.io/) is integrated tool to group, merge, archive and compare coverage reports.

#### Disable Codecov

1. Remove "Report Code Coverage to codecov" action in [Node CI workflow](./.github/workflows/nodejs.yml#L47-50).
    ```diff
    -47:      - name: Report Code Coverage to codecov
    -48:        uses: codecov/codecov-action@v1.0.5
    -49:        with:
    -50:          token: ${{ secrets.CODECOV_TOKEN }}
    ```
1. Remove Codecov badge in [README](./README.md#L5).
    ```diff
    - 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
    ```

#### Enable Codecov

1. Sign up from [Codecov web page](https://codecov.io/).
1. Add your repository in Codecov web console.
1. Get `CODECOV_TOKEN` from web console.
1. Create `CODECOV_TOKEN` [Secret](https://help.github.com/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) to your GitHub Repository.
1. Install [Codecov](https://github.com/marketplace/codecov) GitHub App.
1. Change Codecov badge URL in [README](./README.md#L5).
    ```diff
    - 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
    + 5: [![codecov](https://codecov.io/gh/owner/repo/branch/master/graph/badge.svg)](https://codecov.io/gh/owner/repo)
    ```

### CodeFactor

[CodeFactor](https://www.codefactor.io/) is automated code review tool. 

#### Disable CodeFactor

1. Remove CodeFactor badge in [README](./README.md#L6).
    ```diff
    - 6: [![CodeFactor](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template/badge)](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template)
    ```

#### Enable CodeFactor

1. Sign up from [CodeFactor web page](https://www.codefactor.io/).
1. Add your repository in CodeFactor web console.
1. Install [CodeFactor](https://github.com/marketplace/codefactor) GitHub App.
1. Change Codecov badge URL in [README](./README.md#L6).
    ```diff
    - 6: [![CodeFactor](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template/badge)](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template)
    + 6: [![CodeFactor](https://www.codefactor.io/repository/github/owner/repo/badge)](https://www.codefactor.io/repository/github/owner/repo)
    ```

## GitHub Actions

This repository uses GitHub Actions for unit test and deployment.
The following job is executed when you commit to `master` or send pull request.
- Lint (ESLint, Prettier)
- Build (`nuxt generate`)
- Unit Test (Jest)
- Report coverage to Codecov

In addition, deploy job is execuded when tag is pushed.
- Deploy to GitHub Pages

If it does not fit your strategy, change or remove [Node CI workflow](./.github/workflows/nodejs.yml).
