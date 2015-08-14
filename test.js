var expect  = require('expect.js'),
    _       = require('underscore');
expect = require('./expect.underscore.js').extend(expect, _);

describe('check users for fred', function() {
    var userNames = [
        'barney',  
        'fred',
        'pebbles',
    ];
    var users = [
      { 'user': 'barney',  'active': true },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': false }
    ];

    it('using expectjs', function() {
        // you either check with the whole object,
        expect(userNames).to.contain('fred');

        // or split the lines
        var fred = _.find(users, {user: 'fred'});
        expect(fred).to.be.ok();
    });

    it('using _.find', function() {
        // better readability
        expect(users).to._.find({user: 'fred'});
    });

    describe('.not.to', function() {

        it('using _.find', function() {
            expect(users).not.to._.find({
                active: undefined
            });
        });
    });
});

