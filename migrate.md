# MIGRATE GUIDE

## Short Hands

1. Remove or replace [README badges](./README.md#L3-7).
1. Replace `nuxt-ts-template` with `your-app-name`.
1. Replace `(N|n)ogic` with `Owner Name`.
1. Set your app version to [package.json](./package.json#L3).

## README badges

[Badges in README](./README.md#L3-7) include absolute path depends on this repository.
So you should remove or replace them.

```diff
 3: [![release version](https://img.shields.io/github/v/release/nogic1008/nuxt-ts-template "release version")](https://github.com/nogic1008/nuxt-ts-template/releases)
 4: [![Node.js CI Status](https://github.com/nogic1008/nuxt-ts-template/workflows/Node%20CI/badge.svg "Node.js CI Status")](/nogic1008/nuxt-ts-template/actions?query=workflow%3A%22Node+CI%22)
 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg?token=kqxUANskoN)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
 6: [![CodeFactor](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template/badge)](https://www.codefactor.io/repository/github/nogic1008/nuxt-ts-template)
 7: [![License](https://img.shields.io/github/license/nogic1008/nuxt-ts-template)](LICENSE)
```

Some badges are provided by third party services. See also [Services](#services) section.

## Package Description

Fix package info to that of your application.

- [package.json#L2-5](./package.json#L2-5)

  ```diff
   1: {
  -2:   "name": "nuxt-ts-template",
  -3:   "version": "1.4.3",
  -4:   "description": "Template",
  -5:   "author": "nogic",
  +2:   "name": "your-app-name",
  +3:   "version": "0.0.1",
  +4:   "description": "Your app description",
  +5:   "author": "Your Name",
  ```

## License

If you keep to use MIT License, change [LICENSE](./LICENSE#L3) signiture and year.

```diff
 1: MIT License
 2: 
-3: Copyright (c) 2020-2021 Nogic
+3: Copyright (c) 2020-2021 Your Name
```

Or replace LICENSE file and [package.json#L7](./package.json#L7) if you want to use another one.

```diff
-7:   "license": "MIT",
+7:   "license": "License Name you choose",
```

## Services

### Dependabot

[Depandabot](https://help.github.com/github/administering-a-repository/about-github-dependabot) is integrated tool to keep repo's dependencies secure and up-to-date.

#### Disable Dependabot

1. Delete [`./.github/dependabot.yml`](./.github/dependabot.yml) file.

#### Enable Dependabot

1. Edit [`./.github/dependabot.yml`](./.github/dependabot.yml) according to your strategy.
    - [Click here](https://help.github.com/github/administering-a-repository/configuration-options-for-dependency-updates) for configuration file documentation.

### Codecov

[Codecov](https://codecov.io/) is integrated tool to group, merge, archive and compare coverage reports.

#### Disable Codecov

1. Remove "Report Code Coverage to codecov" action in [Node.js CI workflow](./.github/workflows/nodejs.yml#L63-64).

    ```diff
    -63:      - name: Report Code Coverage to codecov
    -64:        uses: codecov/codecov-action@v2.0.2
    ```

1. Remove Codecov badge in [README](./README.md#L5).

    ```diff
    - 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg?token=kqxUANskoN)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
    ```

#### Enable Codecov

1. Sign up from [Codecov web page](https://codecov.io/).
1. Add your repository in Codecov web console.
1. Install [Codecov](https://github.com/marketplace/codecov) GitHub App.
1. Open your repository on Codecov web console.
1. Copy badge text from `Settings` -> `Badge` -> `Markdown` section.
1. Paste and replace it on [README](./README.md#L5).

    ```diff
    - 5: [![codecov](https://codecov.io/gh/nogic1008/nuxt-ts-template/branch/master/graph/badge.svg?token=kqxUANskoN)](https://codecov.io/gh/nogic1008/nuxt-ts-template)
    + 5: [![codecov](https://codecov.io/gh/owner/repo/branch/master/graph/badge.svg?token=XXXXXXXXXX)](https://codecov.io/gh/owner/repo)
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

In addition, deploy job is execuded when released.

- Deploy to GitHub Pages

If it does not fit your strategy, change or remove [workflow files](./.github/workflows/).
