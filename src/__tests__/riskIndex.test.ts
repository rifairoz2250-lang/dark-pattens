import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Transparent scoring formula logic as defined in your specifications
function calculateRiskScore(issues: Array<{ severity: 'Low' | 'Medium' | 'High' }>): number {
  const pointsMap = { Low: 10, Medium: 20, High: 30 };
  const rawTotal = issues.reduce((acc, issue) => acc + (pointsMap[issue.severity] || 0), 0);
  return Math.min(100, rawTotal);
}

// Guardrail non-defamatory vocabulary validator
function validateWording(text: string): boolean {
  const bannedTerms = ['scam', 'fraud', 'fraudulent', 'crook', 'illegal'];
  const lower = text.toLowerCase();
  return !bannedTerms.some((term) => lower.includes(term));
}

describe('BetYouPay Risk Engine & Safety Tests', () => {
  it('correctly calculates the risk index with transparent weightings', () => {
    const issues = [
      { severity: 'Low' as const },
      { severity: 'Medium' as const },
      { severity: 'High' as const },
    ];
    // 10 + 20 + 30 = 60
    assert.strictEqual(calculateRiskScore(issues), 60);
  });

  it('strictly caps the risk score at 100 points', () => {
    const manyIssues = [
      { severity: 'High' as const },
      { severity: 'High' as const },
      { severity: 'High' as const },
      { severity: 'High' as const },
    ];
    // 30 * 4 = 120 -> capped at 100
    assert.strictEqual(calculateRiskScore(manyIssues), 100);
  });

  it('rejects defamatory vocabulary according to safety guidelines', () => {
    const sampleSafeSummary = "Potential dark pattern detected with a possible hidden recurring fee.";
    const sampleDefamatorySummary = "This website is an outright scam and illegal fraud.";

    assert.strictEqual(validateWording(sampleSafeSummary), true);
    assert.strictEqual(validateWording(sampleDefamatorySummary), false);
  });
});
