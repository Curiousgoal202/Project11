// simple test to simulate CI test pass/fail
const http = require('http');

const options = {
  host: 'localhost',
  port: process.env.TEST_PORT || 8080,
  path: '/health',
  timeout: 2000
};

const req = http.get(options, res => {
  if (res.statusCode === 200) {
    console.log('TEST-PASSED');
    process.exit(0);
  } else {
    console.error('TEST-FAILED: status', res.statusCode);
    process.exit(1);
  }
});

req.on('error', err => {
  console.error('TEST-FAILED:', err.message);
  process.exit(1);
});
