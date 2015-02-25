
# expectjs with underscore support

[expectjs](https://github.com/Automattic/expect.js) is a 'Minimalistic BDD assertion toolkit'.

It is simple to use, but is short in matchers which makes writing test codes a frown.

This extension inserts an underscore matchers under the belt, so you can easily test with power of underscore in your hands.


```javascript
	var expect  = require('expect.js'),
		_       = require('underscore');
	
	// PATCH expect here
	expect = require('../expect.underscore.js').extend(expect);

	describe('check users for fred', function() {
		var users = [
		  { 'user': 'barney',  'active': true },
		  { 'user': 'fred',    'active': false },
		  { 'user': 'pebbles', 'active': false }
		];

		it('using expect', function() {
			// check with whole object
		    expect(users).to.contain({ 'user': 'fred', 'active': false });
			// or
			var fred = _.find(users, {user: 'fred'});
			expect(fred).to.be.ok();
		});

		it('using expect._', function() {
			// better readability
			expect(users).to._.find({user: 'fred'});
		});
	});

```

You can use every underscore methods under the `.to._` object, and it will check if the result is `.ok()`.


Currently tested with [lodash](https://lodash.com/) (sorry), and only in nodejs.

