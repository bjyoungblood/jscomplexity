var Promise = require('bluebird'),
    cr = require('escomplex'),
    treeWalker = require('escomplex-ast-moz'),
    esprima = require('esprima'),
    reactTools = require('react-tools');

/**
 * Builds final complexity report of
 * a given file from its reference and content
 *
 * @param {String} 'fileRef'    The file path
 * @param {String} 'fileData'   The file content stringified
 * @returns {Promise}           The fulfilled promise returns the report {Object}
 */

module.exports = function(fileRef, fileData){

  return new Promise(function(resolve, reject){

    var report;

    if ((/\.(jsx)$/i).test(fileRef)) {
      fileData = reactTools.transform(fileData);
    }

    try {
      report = cr.analyse( esprima.parse(fileData, {loc : true}),  treeWalker);
    } catch(e){
      reject('parsing error');
    }

    resolve({
      path            : fileRef,
      escapedPath     : fileRef.replace(/\\/g, '\\'), // windows use
      complexity      : report.aggregate.cyclomatic,
      lineNumber      : report.aggregate.sloc.logical,
      maintainability : report.aggregate.halstead.effort,
      halstead        : {
          length         : report.aggregate.halstead.length,
          vocabulary     : Math.round(report.aggregate.halstead.vocabulary),
          difficulty     : Math.round(report.aggregate.halstead.difficulty),
          bugs           : Math.round(report.aggregate.halstead.bugs)
      }
    });

  });

};
