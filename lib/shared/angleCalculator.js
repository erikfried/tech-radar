/**
 * Creates a angle between 0 and Math.PI / 2 based on the name
 * @param name
 * @returns {number}
 */
'use strict';
exports.radians = function (name) {
    var v = name.length;
    for (var i = 0; i < name.length; i++) {
        v += name.charCodeAt(i);
    }
    return ((v * 100) % (Math.PI / 2 * 100)) / 100;
};

exports.coords = function (angle, radius) {
    return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
    };
};
