/**
 * XXX: The tests don't seem to run if we have mockup-core installed.
 */

define(['<%= patternNameLower %>'], function(<%= patternNameLower %>) {
    buster.testCase("A test case", {
        "<%= patternNameLower %> foo": function() {
            buster.assert(false, true);
            assert.equals(<%= patternNameLower %>.foo(), 'string');
        }
    });
});
