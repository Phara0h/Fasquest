# FastRequest
A fast node request model, works very similar to `request` module.

### Install
```
npm install fastrequest
```

### Basic Example 
```js
const fastRequest = require('fastrequest');

var options = {
  uri: 'http://127.0.0.1/',
  resolveWithFullResponse: true,
  json: true
}
  
fastRequest.request(options).then(res=>{
  console.log('hey look I got a response')
}) 


```
