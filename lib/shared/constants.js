'use strict';

var categories = {
    'tools': 'Tools',
    'techniques': 'Techniques',
    'platforms': 'Platforms',
    'languages': 'Languages & Framworks'
};
var angleOffsets = {
    'tools': 0,
    'techniques': Math.PI / 2,
    'platforms': Math.PI,
    'languages': 3 * Math.PI / 2
};

exports.CATEGORY_NAMES = categories;
exports.ANGLE_OFFSETS = angleOffsets;
