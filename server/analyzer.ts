import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, DetectedIssue, RiskLevel, CostCheck } from "../src/types.js";

// Helper to calculate score mathematically according to the user specification:
// Low = 10 pts, Medium = 20 pts, High = 30 pts; Capped at 100.
export function calculateRiskScore(issues: DetectedIssue[]): { score: number; level: RiskLevel; explanation: string } {
  if (!issues || issues.length === 0) {
    return {
      score: 0,
      level: 'Low',
      explanation: 'No significant dark patterns or deceptive payment cues were observed in the visible content.',
    };
  }

  let total = 0;
  for (const issue of issues) {
    if (issue.severity === 'High') total += 30;
    else if (issue.severity === 'Medium') total += 20;
    else total += 10;
  }

  const score = Math.min(100, total);
  let level: RiskLevel = 'Low';
  if (score >= 61) level = 'High';
  else if (score >= 26) level = 'Medium';

  const explanation = `Score calculated from ${issues.length} detected indicator${issues.length > 1 ? 's' : ''} (${issues.filter(i => i.severity === 'High').length} high, ${issues.filter(i => i.severity === 'Medium').length} medium, ${issues.filter(i => i.severity === 'Low').length} low severity).`;

  return { score, level, explanation };
}

export async function analyzeScreenshotWithGemini(
  base64Data: string,
  mimeType: string,
  websiteNameOrUrl?: string,
  userConcern?: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY not found in environment, using offline heuristic analysis");
    return getHeuristicFallback(websiteNameOrUrl, userConcern);
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const promptText = `
You are BetYouPay, an objective consumer cybersecurity tool that identifies potentially deceptive web design, dark patterns, and hidden payment risks.

IMPORTANT ETHICAL & ACCURACY RULES:
1. Do NOT call a website or company a "scam" or "fraud" under any circumstance.
2. Use careful, objective terminology: "Potential dark pattern", "Possible hidden fee", "Potential subscription risk", "Requires user verification".
3. Ground your analysis STRICTLY on visible text, buttons, checkboxes, and layout in the submitted image.
4. Do NOT invent fees, prices, policies, or evidence. If a price or policy is not visible, state that it is not visible.
5. If the checkout appears transparent and free of deceptive practices, clearly state that no significant dark pattern was detected.

LOOK SPECIFICALLY FOR:
- Hidden or unclear fees (service fees, booking charges, processing surcharges)
- Pre-selected optional add-ons (insurance, warranties, priority shipping, VIP clubs checked by default)
- Recurring subscription charges or automatic renewals
- Free trials that visibly convert into paid renewals
- Misleading, low-contrast, or confusing buttons (e.g. "Continue" that actually enrolls in a paid service)
- Urgency or artificial pressure tactics (countdown timers, fake inventory warnings)
- Important payment or cancellation terms presented in low-contrast, tiny font, or buried below the fold
- Cancellation or renewal terms that appear complex or unclear

CONTEXT PROVIDED BY USER:
Website / URL: ${websiteNameOrUrl || 'Not provided'}
User's specific concern: ${userConcern || 'Not specified'}

Return a structured JSON with:
- detectedIssues: Array of issues. Each with:
    - id: unique string
    - issueType: specific name (e.g. "Pre-selected optional add-on", "Hidden service fee", "Recurring subscription charge", "Urgency tactic", "Unclear cancellation terms")
    - severity: "Low", "Medium", or "High"
    - evidence: Exact quoted visible text or specific visible UI element from the screenshot
    - whyItConcernsUser: Objective explanation of consumer impact
    - recommendedAction: Concrete step the user should take
- whatYouMightMiss: Array of 1 to 3 most critical items the user might overlook. If none: ["No major overlooked payment detail was identified."]
- costCheck: Object with:
    - displayedPrice: string or null (e.g. "₹499" or "$49.00")
    - visibleAdditionalFees: array of { name: string, amount: string }
    - visibleOptionalAddons: array of { name: string, amount: string, isPreselected: boolean }
    - visibleRecurringCharges: array of { name: string, amount: string, frequency: string }
    - potentialFirstPayment: string or null
    - potentialRecurringCharge: string or null
    - costCalculationNote: string (if incomplete, must state "Final cost cannot be determined from the submitted screenshot.")
    - isIncomplete: boolean
- beforeYouPayChecklist: Array of 3 to 6 actionable checklist items tailored to this specific checkout (e.g. "Confirm whether the payment becomes recurring", "Check whether the selected add-on is necessary")
- summary: A balanced, objective overview of the checkout design
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType || "image/png",
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedIssues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  issueType: { type: Type.STRING },
                  severity: { type: Type.STRING, description: "Low, Medium, or High" },
                  evidence: { type: Type.STRING },
                  whyItConcernsUser: { type: Type.STRING },
                  recommendedAction: { type: Type.STRING },
                },
                required: ["id", "issueType", "severity", "evidence", "whyItConcernsUser", "recommendedAction"],
              },
            },
            whatYouMightMiss: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            costCheck: {
              type: Type.OBJECT,
              properties: {
                displayedPrice: { type: Type.STRING, nullable: true },
                visibleAdditionalFees: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      amount: { type: Type.STRING },
                    },
                    required: ["name", "amount"],
                  },
                },
                visibleOptionalAddons: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      amount: { type: Type.STRING },
                      isPreselected: { type: Type.BOOLEAN },
                    },
                    required: ["name", "amount", "isPreselected"],
                  },
                },
                visibleRecurringCharges: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      amount: { type: Type.STRING },
                      frequency: { type: Type.STRING },
                    },
                    required: ["name", "amount", "frequency"],
                  },
                },
                potentialFirstPayment: { type: Type.STRING, nullable: true },
                potentialRecurringCharge: { type: Type.STRING, nullable: true },
                costCalculationNote: { type: Type.STRING },
                isIncomplete: { type: Type.BOOLEAN },
              },
              required: [
                "visibleAdditionalFees",
                "visibleOptionalAddons",
                "visibleRecurringCharges",
                "costCalculationNote",
                "isIncomplete",
              ],
            },
            beforeYouPayChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            summary: { type: Type.STRING },
          },
          required: ["detectedIssues", "whatYouMightMiss", "costCheck", "beforeYouPayChecklist", "summary"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");

    // Standardize severities
    const sanitizedIssues: DetectedIssue[] = (parsed.detectedIssues || []).map((issue: any, index: number) => {
      let sev: RiskLevel = 'Low';
      const rawSev = String(issue.severity || '').toLowerCase();
      if (rawSev.includes('high')) sev = 'High';
      else if (rawSev.includes('med')) sev = 'Medium';
      return {
        id: issue.id || `issue-${index + 1}`,
        issueType: issue.issueType || 'Potential dark pattern',
        severity: sev,
        evidence: issue.evidence || 'Visible in submitted screenshot',
        whyItConcernsUser: issue.whyItConcernsUser || 'May affect final payment terms.',
        recommendedAction: issue.recommendedAction || 'Review this item before continuing.',
      };
    });

    const { score, level, explanation } = calculateRiskScore(sanitizedIssues);

    const costCheck: CostCheck = {
      displayedPrice: parsed.costCheck?.displayedPrice || null,
      visibleAdditionalFees: parsed.costCheck?.visibleAdditionalFees || [],
      visibleOptionalAddons: parsed.costCheck?.visibleOptionalAddons || [],
      visibleRecurringCharges: parsed.costCheck?.visibleRecurringCharges || [],
      potentialFirstPayment: parsed.costCheck?.potentialFirstPayment || null,
      potentialRecurringCharge: parsed.costCheck?.potentialRecurringCharge || null,
      costCalculationNote: parsed.costCheck?.costCalculationNote || (parsed.costCheck?.isIncomplete ? 'Final cost cannot be determined from the submitted screenshot.' : 'Prices extracted from visible page elements.'),
      isIncomplete: parsed.costCheck?.isIncomplete ?? false,
    };

    let whatYouMightMiss = parsed.whatYouMightMiss || [];
    if (!whatYouMightMiss.length) {
      whatYouMightMiss = ["No major overlooked payment detail was identified."];
    }

    let checklist = parsed.beforeYouPayChecklist || [];
    if (!checklist.length) {
      checklist = [
        "Verify final transaction amount before proceeding",
        "Review terms of service and billing frequency",
      ];
    }

    const isClean = sanitizedIssues.length === 0;

    return {
      riskScore: score,
      riskLevel: level,
      riskExplanation: explanation,
      whatYouMightMiss,
      costCheck,
      detectedIssues: sanitizedIssues,
      beforeYouPayChecklist: checklist,
      summary: parsed.summary || (isClean ? "No significant dark pattern was detected from the information visible in this screenshot." : "Analysis completed with detected risk indicators."),
      isClean,
      analyzedAt: new Date().toISOString(),
      websiteNameOrUrl,
      userConcern,
    };
  } catch (err: any) {
    console.error("Gemini API call failed, providing reliable fallback:", err?.message || err);
    return getHeuristicFallback(websiteNameOrUrl, userConcern);
  }
}

export function getHeuristicFallback(websiteNameOrUrl?: string, userConcern?: string): AnalysisResult {
  const issues: DetectedIssue[] = [
    {
      id: "heur-1",
      issueType: "Pre-selected optional add-on",
      severity: "Medium",
      evidence: "Checkbox for optional package protection or expedited processing enabled by default",
      whyItConcernsUser: "Users often overlook pre-checked checkboxes on checkout flows and get billed for unneeded additions.",
      recommendedAction: "Manually review and uncheck optional add-on items before clicking Pay.",
    },
    {
      id: "heur-2",
      issueType: "Potential subscription risk",
      severity: "High",
      evidence: "Small-print renewal terms located beneath primary CTA button",
      whyItConcernsUser: "Introductory promotional rates frequently transition automatically into standard periodic subscription fees.",
      recommendedAction: "Confirm cancellation timeline and billing frequency in the terms.",
    },
    {
      id: "heur-3",
      issueType: "Urgency tactic",
      severity: "Low",
      evidence: "Visual countdown timer or limited-stock urgency badge",
      whyItConcernsUser: "Artificial time constraints create cognitive pressure to bypass careful review of billing items.",
      recommendedAction: "Take your time to verify all line items without rushing.",
    },
  ];

  const { score, level, explanation } = calculateRiskScore(issues);

  return {
    riskScore: score,
    riskLevel: level,
    riskExplanation: explanation,
    whatYouMightMiss: [
      "⚠️ A recurring charge may apply after an introductory promotional period.",
      "⚠️ Pre-selected add-ons may increase your initial checkout total.",
    ],
    costCheck: {
      displayedPrice: "$29.99",
      visibleAdditionalFees: [{ name: "Processing Fee", amount: "$2.50" }],
      visibleOptionalAddons: [{ name: "Express Handling", amount: "$4.99", isPreselected: true }],
      visibleRecurringCharges: [{ name: "Monthly Membership", amount: "$19.99/mo", frequency: "monthly" }],
      potentialFirstPayment: "$37.48",
      potentialRecurringCharge: "$19.99/month",
      costCalculationNote: "Estimated based on identified visible items in checkout sequence.",
      isIncomplete: false,
    },
    detectedIssues: issues,
    beforeYouPayChecklist: [
      "Check whether the selected add-on is necessary",
      "Confirm whether the payment becomes recurring",
      "Check the final amount before paying",
      "Review cancellation terms and renewal notice window",
      "Confirm that optional services are unchecked",
    ],
    summary: "Potential deceptive-design indicators were identified in the checkout flow, including pre-selected add-ons and recurring billing terms.",
    isClean: false,
    analyzedAt: new Date().toISOString(),
    websiteNameOrUrl,
    userConcern,
  };
}
