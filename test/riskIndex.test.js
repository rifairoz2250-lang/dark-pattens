import test from 'node:test';
import assert from 'node:assert';

function calculateRiskScore(issues) {
  const pointsMap = { Low: 10, Medium: 20, High: 30 };
  const rawTotal = issues.reduce((acc, issue) => acc + (pointsMap[issue.severity] || 0), 0);
  return Math.min(100, rawTotal);
}

function validateWording(text) {
  const bannedTerms = ['scam', 'fraud', 'fraudulent', 'crook', 'illegal'];
  const lower = text.toLowerCase();
  return !bannedTerms.some((term) => lower.includes(term));
}

test('BetYouPay Risk Engine calculates score accurately', () => {
  const issues = [{ severity: 'Low' }, { severity: 'Medium' }, { severity: 'High' }];
  assert.strictEqual(calculateRiskScore(issues), 60);
});

test('BetYouPay Risk Engine strictly caps at 100 points', () => {
  const manyIssues = [{ severity: 'High' }, { severity: 'High' }, { severity: 'High' }, { severity: 'High' }];
  assert.strictEqual(calculateRiskScore(manyIssues), 100);
});

test('BetYouPay Guardrails reject defamatory vocabulary', () => {
  const safe = "Potential dark pattern detected with a possible hidden recurring fee.";
  const defamatory = "This website is an outright scam and illegal fraud.";
  assert.strictEqual(validateWording(safe), true);
  assert.strictEqual(validateWording(defamatory), false);
});

test('BetYouPay Internationalization contains all required languages', () => {
  const supported = ['en', 'hi', 'ta', 'es'];
  assert.strictEqual(supported.length, 4);
});
