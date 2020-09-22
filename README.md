# Fasquest
A fast node request model, works very similar to `request` module but way faster and no dependencies + it works in the browser!

### Install
```
npm install fasquest
```

### Basic Node Example
```js
const Fasquest = require('fasquest');

var options = {
  uri: 'http://127.0.0.1/',
  resolveWithFullResponse: true
}

Fasquest.request(options).then(res=>{
  console.log('hey look I got a response')
})


```

### Basic Web Example
```js
import Fasquest from "fasquest";
var options = {
  uri: 'http://127.0.0.1/',
  resolveWithFullResponse: true
}

await Fasquest.request(options);


```


## Changelog

### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

### [v3.0.0](https://github.com/Phara0h/Fasquest/compare/v2.4.0...v3.0.0)

> 22 September 2020

- Fixed tests and fixed issue with options being mutated [`0e90d84`](https://github.com/Phara0h/Fasquest/commit/0e90d8475d91790f467d9882f624bacd70f0fdf8)

#### [v2.4.0](https://github.com/Phara0h/Fasquest/compare/v2.3.0...v2.4.0)

> 14 September 2020

- added a way to set the agent [`25a8521`](https://github.com/Phara0h/Fasquest/commit/25a8521de09ba3aee70939d11b619af222fa2fb9)

#### [v2.3.0](https://github.com/Phara0h/Fasquest/compare/v2.2.0...v2.3.0)

> 11 September 2020

- Fixed memory leak [`433d5b3`](https://github.com/Phara0h/Fasquest/commit/433d5b3a15a6a3447a0b96179bdf9e8397bf4cda)

#### [v2.2.0](https://github.com/Phara0h/Fasquest/compare/v2.1.2...v2.2.0)

> 11 September 2020

- Update index.mjs [`e5e037f`](https://github.com/Phara0h/Fasquest/commit/e5e037f7685f4c5b00aaecacff06bd833d002c0a)
- Added timeout functionality and fixed error message names. [`9b7e593`](https://github.com/Phara0h/Fasquest/commit/9b7e593e7a9b029aa28b8e82db7cf6c3dbcdeb56)

#### [v2.1.2](https://github.com/Phara0h/Fasquest/compare/v2.1.1...v2.1.2)

> 1 September 2020

- Added `npm publish` at the end of postversion [`7266053`](https://github.com/Phara0h/Fasquest/commit/7266053192c6973a0c45ecee381784ef19063420)

#### [v2.1.1](https://github.com/Phara0h/Fasquest/compare/v2.1.0...v2.1.1)

> 1 September 2020

- Update index.mjs [`1188bb9`](https://github.com/Phara0h/Fasquest/commit/1188bb9c74d4b61ad02ade54d39f294b00b34c02)

#### [v2.1.0](https://github.com/Phara0h/Fasquest/compare/v2.0.2...v2.1.0)

> 1 September 2020

- Updated auto-changelog [`72b9afc`](https://github.com/Phara0h/Fasquest/commit/72b9afc6bac292d71710877404a71cc43affa1e7)
- Squashed bugs [`5b9ddbe`](https://github.com/Phara0h/Fasquest/commit/5b9ddbea551159b970707cc7d72e8d6057e5edb5)

#### [v2.0.2](https://github.com/Phara0h/Fasquest/compare/v2.0.1...v2.0.2)

> 8 July 2020

- Fixed bug with redirect [`638ace1`](https://github.com/Phara0h/Fasquest/commit/638ace1883f9ead950e7eac61cc904f168fb394c)

#### [v2.0.1](https://github.com/Phara0h/Fasquest/compare/v2.0.0...v2.0.1)

> 8 July 2020

- Update package.json [`15ededc`](https://github.com/Phara0h/Fasquest/commit/15ededcbb5a7e75a3121c23e824a9e98aace2d0c)

### [v2.0.0](https://github.com/Phara0h/Fasquest/compare/v1.2.3...v2.0.0)

> 8 July 2020

- Added browser es module version [`c54e7cc`](https://github.com/Phara0h/Fasquest/commit/c54e7ccdf57f784507c3a5f9f7e87c374fcc6b44)

#### [v1.2.3](https://github.com/Phara0h/Fasquest/compare/v1.2.2...v1.2.3)

> 23 October 2019

- Protect against response body not being able to be parsed [`#1`](https://github.com/Phara0h/Fasquest/pull/1)
- 1.2.3 json empty body fix [`b6f1f07`](https://github.com/Phara0h/Fasquest/commit/b6f1f0744775ea436048617edbe318a7777cf765)

#### [v1.2.2](https://github.com/Phara0h/Fasquest/compare/v1.2.1...v1.2.2)

> 12 September 2019

- 1.2.2 Fixed content-length bug [`fb48137`](https://github.com/Phara0h/Fasquest/commit/fb481374c1779fcaac886ba5aabb77fe3cb9cfaf)

#### [v1.2.1](https://github.com/Phara0h/Fasquest/compare/v1.2.0...v1.2.1)

> 12 September 2019

- 1.2.1 Fixed content-length bug [`00f6b9d`](https://github.com/Phara0h/Fasquest/commit/00f6b9db1405e655d2300948745a486acf305e95)

#### v1.2.0

> 11 September 2019

- 1.2.0 Added auth basic, auth bearer and urlxml params [`faec2e7`](https://github.com/Phara0h/Fasquest/commit/faec2e7c3610dce6afed15c541a6a680922fb059)
- added basic follow redirect [`a08b8ce`](https://github.com/Phara0h/Fasquest/commit/a08b8cec801265c5d6c4ac2d01ab82804be20373)
- Renamed to Fasquest [`db1fbc5`](https://github.com/Phara0h/Fasquest/commit/db1fbc51d2e866979e1061b6aff67157254506fe)
- Update README.md [`59c1e8b`](https://github.com/Phara0h/Fasquest/commit/59c1e8b2d0b9da2646c21f638ed632fd37a36b67)
- Init commit [`c4511ab`](https://github.com/Phara0h/Fasquest/commit/c4511ab8c6be5cd1629fa0a83a59cb310fb9c7d9)
- Update README.md [`2353cdc`](https://github.com/Phara0h/Fasquest/commit/2353cdcf1f6b3abc56a46959da8901d9de973706)
- Initial commit [`39a43e3`](https://github.com/Phara0h/Fasquest/commit/39a43e342161ce97f492a30169c446b29d5f3bf7)

