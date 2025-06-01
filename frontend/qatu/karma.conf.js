process.env.CHROME_BIN = process.env.CHROME_BIN || '/usr/bin/google-chrome-stable';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' }, 
        { type: 'text-summary' },
        { type: 'lcovonly' },
        { type: 'cobertura' }
      ],
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    restartOnFileChange: false,
    
    browsers: process.env.CI ? ['ChromeHeadlessCINoSandbox'] : ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCINoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--headless',
          '--disable-web-security'
        ]
      }
    }
  });
};