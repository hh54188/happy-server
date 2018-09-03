
https://github.com/zeit/next.js

## Digest

- Server rendering and indexing of `./pages`
- Static file serving. `./static/` is mapped to `/static/` (given you create a ./static/ directory inside your project)
- Every import you declare gets bundled and served with each page. That means pages never load unnecessary code!

## Data Fetch

https://github.com/zeit/next.js/blob/canary/examples/data-fetch/pages/index.js

- To load data when the page loads, we use `getInitialProps` which is an `async` `static` method
- Make sure the returned object from `getInitialProps` is a `plain Object` and not using Date, Map or Set.
- (**???**) For the initial page load, getInitialProps will execute on the server only. *`getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs* .
- (**???**) `getInitialProps` can not be used in children components. Only in pages. You can also define the getInitialProps lifecycle method for stateless component

## Routing

- Use `<Link prefetch>` for maximum performance,
- The component `<Link>` can also receive an URL object and it will automatically format it to create the URL string.
- Imperatively
  - Intercepting `popstate`
  - Router Events
- (**???**) Shallow Routing (Shallow routing works only for same page URL changes.)

## High Order Compnoent

## Prefetching Pages (Production Only)

## Custom server and routing

- By default, Next will serve each file in `/pages` under a pathname matching the filename (eg, `/pages/some-file.js` is served at `site.com/some-file`. To disable this behavior, set the `useFileSystemPublicRoutes` option in your next.config.js to false
- (**???**) Dynamic assetPrefix
- (**???**) Dynamic Import

## Custom `<App>`

- Persisting layout between page changes
- Keeping state when navigating pages
- Custom error handling using componentDidCatch
- Inject additional data into pages (for example by processing GraphQL queries)

## Custom `<Document>`

-  `_document` is only rendered on the server side and not on the client side. Event handlers like onClick can't be added to this file
- React-components outside of `<Main />` will not be initialised by the browser. Do not add application logic here. If you need shared components in all your pages (like a menu or a toolbar), take a look at the `App` component instead.

## Custom error handling

## Custom configuration

- distDir
- generateEtags
- maxInactiveAge
- pagesBufferLength
- pageExtensions

## Customizing webpack config

## Customizing babel config

## Exposing configuration to the server / client side

```javascript
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig from next.config.js nothing else.
const {serverRuntimeConfig, publicRuntimeConfig} = getConfig()
```

## Static HTML export

next export is a way to run your Next.js app as a standalone static app without the need for a Node.js server. The exported app supports almost every feature of Next.js, including dynamic urls, prefetching, preloading and dynamic imports.

## Multi Zones

A zone is a single deployment of a Next.js app. Just like that, you can have multiple zones. Then you can merge them as a single app.