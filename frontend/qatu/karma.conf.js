module.exports = function (config) {
  process.env.CHROME_BIN = process.env.CHROME_BIN || '/usr/bin/google-chrome-stable';
  console.log('🔍 Configurando Karma...');
  console.log('CI environment:', process.env.CI);
  console.log('Chrome bin:', process.env.CHROME_BIN);
  
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
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--remote-debugging-port=9222',
          '--headless',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      }
    },
    
    // Configurações para ambiente CI
    captureTimeout: 120000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000
  });
  
  console.log('✅ Karma configurado com browsers:', config.browsers || ['padrão']);
};