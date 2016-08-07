var srcPath = 'app/';
var devPath = 'public/';
var buildPath = 'build/';

module.exports = {
  src: srcPath,
  dev: devPath,
  build: buildPath,
  scripts: [srcPath+'app.js', srcPath+'*.js', srcPath+'**/*.js', '!'+srcPath+'*spec.js', '!'+srcPath+'**/*spec.js'],
  css: [srcPath+'*.scss', srcPath+'**/*.scss', srcPath+'*.css', srcPath+'**/*.css'],
  injectScripts: [devPath+'app.js', devPath+'*.js', devPath+'**/*.js'],
  injectCss: [devPath+'*.css', devPath+'**/*.css'],
  partials: [srcPath+'**/*.html'],
  bower: './bower.json'
};
