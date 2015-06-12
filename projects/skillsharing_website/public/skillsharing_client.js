/**
 * Created by Administrator on 2015/6/11.
 */
function request(options, callback) {
    var req = new XMLHttpRequest();
    req.open(options.method || "GET", options.pathname, true);
    req.addEventListener("load", function() {
        if (req.status < 400) {
            callback(null, req.responseText);
        } else {
            callback(new Error("Request failed: " + req.statusText));
        };
    });
    req.addEventListener("error", function() {
        callback(new Error("Network error"));
    });
    req.send(options.body || null);
}