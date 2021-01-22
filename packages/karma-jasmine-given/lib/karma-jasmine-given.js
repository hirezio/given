var createPattern = function (file) {
  return {
    pattern: file,
    included: true,
    served: true,
    watched: false,
  };
};

var initJasmineGiven = function (files) {
  jasmineGivenFile = createPattern(require.resolve('@hirez_io/jasmine-given'));

  // Find "karma-jasmine" last file (adapter.js) to make sure
  // "jasmine" is loaded before "jasmine-given"
  const karmaJasmineAdapterFileIndex = files.findIndex((file) => {
    return file.pattern.indexOf('adapter.js') !== -1;
  });

  if (karmaJasmineAdapterFileIndex !== -1) {
    files.splice(karmaJasmineAdapterFileIndex + 1, 0, jasmineGivenFile);
  } else {
    files.unshift(jasmineGivenFile);
  }
};

initJasmineGiven.$inject = ['config.files'];

module.exports = {
  'framework:@hirez_io/jasmine-given': ['factory', initJasmineGiven],
  'framework:@hirez_io/karma-jasmine-given': ['factory', initJasmineGiven],
};
