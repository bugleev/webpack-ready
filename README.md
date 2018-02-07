<div align="center">
<h1>webpack-ready</h1>
  <a href="https://github.com/webpack/webpack">
    <img width="100" heigth="100" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <br>
  <br>
  <p>
   Ready-to-use webpack v3 configs
  </p>
</div>

<h2 align="center">Overview</h2>

Here i put together some webpack v3 configs. All builds have all the feautures needed for convinient development flow and to-production shipment. These are just working templates, you need to customize them according to your needs. Use the [official Webpack documentation](https://webpack.js.org/guides/) for that.

<h2 align="center">Usage</h2>

- Clone repository
- Open terminal and go into preferred build folder
```bash
cd webpack-standart
```
- Install dependencies
```bash
npm install
```
- Put your source files into `/src` folder (**_.css_** or **_.scss_** files should go into `/src/css` folder, **_images_** - into `/src/images/`, **_.js_** files stay in `/src`, ).
In this builds html template is used (`index.ejs` file in `/src` folder), it is bundled and served into the `/dist` folder once webpack is run. All the links to generated bundles are inserted automatically into the output html file.
- Run webpack in production mode:
```bash
npm run prod
```
Output files will go into `/dist` folder.
> By default, `CleanWebpackPlugin` is enabled, which removes `/dist` folder on each run before the compiling is made. 

<h2 align="center">Builds</h2>

> All builds use Babel compiler with the `"env"` preset by default. 

+ ### Webpack-standart
This is a common build for development and production. 
You can run tests with Karma
```bash
npm run test
```
validate Webpack syntax
```bash
npm run validate
```
run development mode, where the dev-server is started and all css is served from the memory with the [.HotModuleReplacementPlugin](https://webpack.js.org/guides/hot-module-replacement/) feature
```bash
npm run dev
```
or run production mode, where all bundles are minified and files served into `/dist` directory
```bash
npm run prod
```
+ ### Webpack-bootstrap
This build is pre-configured to bundle Bootstrap v4 files. 

You can manually select which Bootstrap modules to load by setting **true** or **false** to a module in `.bootstraprc` file:
```js
 # Components
  alert: true
  badge: false
  breadcrumb: false
  button-group: true
  card: true
  ```
To override Bootstrap source styles with your own before the bundle is compiled you need to reassign variables from `/node_modules/bootstrap/scss/_variables.scss` in your `/src/bootstrap/customizations.scss` file.

For example inside `customizations.scss`:
```js
// Customize Bootstrap variables that get imported before the original Bootstrap variables.
// Thus original Bootstrap variables can depend on values from here.
$green: #5c96b8;
```
Run `npm run dev` for development mode with hot module replacment server and no ouput files or `npm run prod` for a production build with minified bundles put into `/dist` folder.

******

