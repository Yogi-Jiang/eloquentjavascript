/**
 * Created by Administrator on 2015/6/11.
 */
var Promise = require("promise");
var fs = require("fs");

var readFile = Promise.denodeify(fs.readFile);
readFile("new.txt", "utf8").then(function(content) {
    console.log("The file contained:" + content);
}, function(error) {
    console.log("Failed to read file: " + error);
});