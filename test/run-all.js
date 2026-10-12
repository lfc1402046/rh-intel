// RH Intel 测试运行器（零依赖）
// 用法：node test/run-all.js

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    throw new Error('Assertion failed: ' + (message || 'unknown'));
  }
}
function assertEqual(a, b, message) {
  if (a !== b) {
    throw new Error('Expected ' + JSON.stringify(b) + ' but got ' + JSON.stringify(a) + '. ' + (message || ''));
  }
}
function assertDeepEqual(a, b, message) {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error('Deep equal failed.\nExpected: ' + JSON.stringify(b) + '\nGot: ' + JSON.stringify(a) + '\n' + (message || ''));
  }
}
function assertThrows(fn, message) {
  try { fn(); throw new Error('Expected function to throw'); }
  catch (e) {
    if (e.message === 'Expected function to throw') {
      throw new Error('Function did not throw. ' + (message || ''));
    }
  }
}

global.assert = assert;
global.assertEqual = assertEqual;
global.assertDeepEqual = assertDeepEqual;
global.assertThrows = assertThrows;
global.test = test;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log('  PASS ' + name);
    passed++;
  } catch (e) {
    console.log('  FAIL ' + name);
    console.log('     ' + e.message);
    failures.push({ name: name, error: e.message });
    failed++;
  }
}

const testFiles = fs.readdirSync(__dirname)
  .filter(f => f.startsWith('test-') && f.endsWith('.js'))
  .sort();

console.log('\nFound ' + testFiles.length + ' test suites\n');

testFiles.forEach(file => {
  const name = file.replace('test-', '').replace('.js', '');
  console.log('\n> ' + name);
  try {
    require(path.join(__dirname, file));
  } catch (e) {
    console.log('  FAIL module load: ' + e.message);
    failed++;
    totalTests++;
  }
});

console.log('\n' + '='.repeat(60));
console.log('Results:');
console.log('  Total: ' + totalTests);
console.log('  Pass:  ' + passed);
console.log('  Fail:  ' + failed);
console.log('='.repeat(60) + '\n');

if (failed > 0) {
  console.log('Failures:');
  failures.forEach(f => console.log('  - ' + f.name + ': ' + f.error));
  process.exit(1);
}

process.exit(0);
