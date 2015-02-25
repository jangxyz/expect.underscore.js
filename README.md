
# Expect.underscore

Expectjs with underscore support.

```javascript
expect([1,2,3,4]).to._.find(function(n) { 
    return n % 2 == 0;
});
```

[expectjs](https://github.com/Automattic/expect.js) is a 'Minimalistic BDD assertion toolkit', which is very simple to use, but is short in matchers that makes writing tests less jolly.

This extension inserts [underscore](http://underscorejs.org/) functions as matchers under the belt, so you can easily test with power of underscore in your hands.

## How to use

### Node

```
$ npm install expect.unerscore.js
```


## Example


```javascript
var expect  = require('expect.js'),
    _       = require('underscore');

// PATCH expect here
expect = require('expect.underscore.js').extend(expect, _);

describe('check users for fred', function() {
    var users = [
      { 'user': 'barney',  'active': true },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': false }
    ];

    it('using expectjs', function() {
        // you either check with the whole object,
        expect(users).to.contain({ 'user': 'fred', 'active': false });
        // or split the lines
        var fred = _.find(users, {user: 'fred'});
        expect(fred).to.be.ok();
    });

    it('using _.find', function() {
        // better readability
        expect(users).to._.find({user: 'fred'});
    });
});

```

You can use every underscore methods under the `.to._` object, and it will check if the result is `.ok()`.


## API

To check the full methods supported, check the [underscore](http://underscorejs.org/) document.

If you prefer [lodash](https://lodash.com/docs), you can pass lodash as an argument instead.



## TODO

Currently tested with [lodash](https://lodash.com/) (sorry), and only in NodeJS.


