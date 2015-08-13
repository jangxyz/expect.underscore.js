/*
 * Patch expect.js to extend underscore/lodash methods
 *
 */

module.exports = {
    extend: function(expect, _) {
        if (typeof expect === 'undefined') {
            expect = require('expectjs');
        }

        if (typeof _ === 'undefined') {
            try {
                _ = require('lodash');
            } catch (err) {
                _ = require('underscore');
            }
        }

        // patch expect
        var util = require('util'),
        i = util.inspect;

        // returns proxy for asserting underscore methods
        var underscoreProxy = function () {
            var self = this;
            var proxy = {};
            for(var name in _) {
                var method = _[name];
                if (typeof method != 'function') {
                    continue;
                }
                (function(name, method){
                    proxy[name] = function() {
                        var _args = Array.prototype.slice.apply(arguments),
                            args = [self.obj].concat(_args);

                        self.assert(
                            !!method.apply(_, args)
                          , function(){ return 'expected ' + i(self.obj) + ' to ' + name + ' with args: ' + i(_args) }
                          , function(){ return 'expected ' + i(self.obj) + ' to not ' + name + ' with args: ' + i(_args) });
                    };
                })(name, method)
            }
            return proxy;
        };
        var _Assertion = expect.Assertion;
        var newAssertion = function (obj, flag, parent) {
            _Assertion.apply(this, arguments);

            // inject underscore proxy under 'to'
            this.to._     = underscoreProxy.apply(this);
            this.not.to._ = (function() {
                this.flags.not = true;
                return underscoreProxy.apply(this);
            }).apply(this);
        };

        // create newExpect
        var newExpect = function expect(obj) {
            return new newAssertion(obj);
        }

        // copy all from expect --> newExpect
        for (var name in expect) {
            newExpect[name] = expect[name];
        }
        for (var name in expect.Assertion.prototype) {
            newAssertion.prototype[name] = expect.Assertion.prototype[name];
        }

        return newExpect;
    }
};

