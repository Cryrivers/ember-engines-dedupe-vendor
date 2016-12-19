var Filter = require('broccoli-persistent-filter');
var Esprima = require('esprima');
var ESCodegen = require('escodegen');

function _findDefineExpressionInRoot(content, callback) {
    var program = Esprima.parse(content, { sourceType: 'script' });
    program.body.forEach(function(node, index, array) {
        if (
            node.type === 'ExpressionStatement' &&
            node.expression.type === 'CallExpression' &&
            node.expression.callee.name === 'define'
        ) {
            var result = callback(node);
            if (result === 'remove') {
                array.splice(index, 1);
            }
        }
    });
    return program;
}

function VendorDedupe(inputNode) {
  Filter.call(this, inputNode, {
    description: 'Dedupe Engine Vendor'
  });
  this.modulesInVendor = [];
}

VendorDedupe.prototype = Object.create(Filter.prototype);
VendorDedupe.prototype.constructor = VendorDedupe;
VendorDedupe.prototype.extensions = ['js'];
VendorDedupe.prototype.targetExtension = 'js';
VendorDedupe.prototype.processString = function(content, relativePath) {
    // Assumption: the location of app vendor
    if (relativePath === 'assets/vendor.js') {
        var _this = this;
        _findDefineExpressionInRoot(content, function(node) {
            _this.modulesInVendor.push(node.expression.arguments[0].value);
        });
    // Assumption: the file name of engine vendor
    } else if (relativePath.endsWith('engine-vendor.js')) {
        var _this = this;
        if (this.modulesInVendor.length === 0) {
            console.log('WARNING: vendor.js might not be parsed.');
        }
        var engineProgram = _findDefineExpressionInRoot(content, function(node) {
            if (_this.modulesInVendor.indexOf(node.expression.arguments[0].value) > -1) {
                return 'remove';
            }
        });
        var generatedCode = ESCodegen.generate(engineProgram)
        return generatedCode;
    }
    return content;
};

module.exports = VendorDedupe;