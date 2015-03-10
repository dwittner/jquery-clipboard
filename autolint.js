module.exports = {
  paths: [ "jquery-clipboard.js", "test/**/*.js" ],   // a list of paths to the files you want linted
  linter: "jslint",         // optionally: jshint
  linterOptions: {          // see default-configuration.js for a list of all options
	maxlen: 100,
	browser: "true",
	node: "true",
    predef: [
      "jQuery",
      "deployJava",
      "clipboardApplet",
      "buster"
    ]              // a list of known global variables
  },
  excludes: []              // a list of strings/regexes matching filenames that should not be linted
};
