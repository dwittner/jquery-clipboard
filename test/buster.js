var config = module.exports;

config["Unit Tests"] = {
	rootPath: "..",
	environment: "browser",
	libs: ["node_modules/jquery/dist/jquery.min.js"],
	sources: ["jquery-clipboard.js"],
	tests: ["test/**/*-test.js"]
};