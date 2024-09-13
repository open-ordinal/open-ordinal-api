# Open Ordinal API

> [!NOTE]
> TL;DR:
> The Open Ordinal API is a JavaScript library / module that can be externally linked by any Ordinal to share its internal data and functionality with an external entity.

The fundamental concept is that an ordinal has the capacity to reveal a wealth of data and capabilities. This proves beneficial for various areas such as in Applications, Wallets, Marketplaces, Custom Proxies, CDNs, Publishers and more.

The Ordinal can expose `General Info`, `Loading State`, `Events`, `Variants`, `Composistions`, `Assets`, `Traits` and `Functionality` trough this library in structured and standardized way.

The complexity of communicating with more complex Ordinals lies in their existence within a web page. For them to be rendered on the screen, they are anticipated to be displayed in a web browser. Therefore, to access the Ordinal API for a backend service, the Ordinal needs to be rendered off-screen using components like WebDriver (ChromeDriver / EdgeDriver aso). This might pose some obstacles, it’s unavoidable, but doable.

A question that arises is… Why can’t most of this be stored as inscriptions directly on the chain? Yes, it can and should be a part of the Ordinal Metadata. But exposing functionality or dynamic data beyond that we need an API.

## Prerequisites

**Advanced:** To develop using the library, it is recommended to run a local ORD server. This can either be a fully synced ORD server for the chain you are testing with or a simple ORD server containing only your test inscriptions. In the latter case, you will also need to inscribe the `open-ordinal-api.min.js` (from the `dist` folder) and refer to it due to CORS restrictions. The local ORD server need to be updated in the `webpack.config.js` proxy settings.

**Simple:** A second choice is to run a local webserver hosting all the files.

## Folders

Folders:
- `dist`: Contain the minified and packaged version of the library.
- `docs`: Contain the generated docs.
- `lib`: Contain the build of the library.
- `src`: Contain all source code for the library and docs source.
- `test`: Contain the testable version used in a HTML-page.

## Documentation

Head over to [the docs](docs/markdown/README.md) to read more about this tiny beast.

## Commands

- `yarn install`: Get all the libraries that is needed for development and running this library.
- `yarn run build`: Builds the `src` to the `lib` folder and then minimize it to the `dist` folder.
- `yarn run test`: The the same as `yarn build` and starts a dev-server hosted on port 9999.
- `yarn run docs`: Builds the `docs`.

## Inscriptions
All Open Ordinal inscriptions.

### Strcture
Parents Strcture

| Type         | Name         | Inscription Id                                                                                                                                                            |
| ------------ | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Organization | Open Ordinal | [0bc778d1744d87a782e165c582979f9c64e15a90cc8e77db25b16f4a740b41d4i0](https://ordinals.com/inscription/0bc778d1744d87a782e165c582979f9c64e15a90cc8e77db25b16f4a740b41d4i0) |
| Collection   | Libraries    | [e4431e01cce9d641e6e1380c1401c1cf0aeb242b5c5f5383aa17c813a7347df3i0](https://ordinals.com/inscription/e4431e01cce9d641e6e1380c1401c1cf0aeb242b5c5f5383aa17c813a7347df3i0) |

### Libraries

| Type   | Name             | Version | Sat                                                         | Inscription Id                                                                                                                                                            |
| ------ | :--------------- | :------ | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Module | Open Ordinal API | 0.9.0   | [156280470160431](https://ordinals.com/sat/156280470160431) | [f9de65c51843738497a07cf3dab5fb13b83c4b135b577ea8c384535c33bae1bci0](https://ordinals.com/inscription/f9de65c51843738497a07cf3dab5fb13b83c4b135b577ea8c384535c33bae1bci0) |
