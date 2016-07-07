var base = require("./base.js");
var factory = require("./../helpers/factory.js");

var component = {
  controller: function (attrs) {
    return {
      getClassList: function (attrs) {
        return ["ui",
                "button"];
      }
    };
  }
};

module.exports = factory(base, component);