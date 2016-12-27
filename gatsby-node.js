const fs = require('fs-extra');

exports.postBuild = function (pages, callback) {
	fs.move('./public', './docs', {clobber: true}, () => fs.copy('./static', './docs', {clobber: false}, callback));
}
