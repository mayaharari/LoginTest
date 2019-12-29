
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./specs/specLogin.js'],
  directConnect: true,
  onPrepare: function() {
    browser.manage().window().maximize();
    browser.waitForAngularEnabled(false);
  }
}