export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface DetectedIssue {
  id: string;
  issueType: string;
  severity: RiskLevel;
  evidence: string;
  whyItConcernsUser: string;
  recommendedAction: string;
}

export interface FeeItem {
  name: string;
  amount: string;
}

export interface AddonItem {
  name: string;
  amount: string;
  isPreselected: boolean;
}

export interface RecurringItem {
  name: string;
  amount: string;
  frequency: string;
}

export interface CostCheck {
  displayedPrice: string | null;
  visibleAdditionalFees: FeeItem[];
  visibleOptionalAddons: AddonItem[];
  visibleRecurringCharges: RecurringItem[];
  potentialFirstPayment: string | null;
  potentialRecurringCharge: string | null;
  costCalculationNote: string;
  isIncomplete: boolean;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  riskExplanation: string;
  whatYouMightMiss: string[];
  costCheck: CostCheck;
  detectedIssues: DetectedIssue[];
  beforeYouPayChecklist: string[];
  summary: string;
  isClean: boolean;
  analyzedAt: string;
  websiteNameOrUrl?: string;
  userConcern?: string;
  imagePreviewUrl?: string;
}

export interface CommunityReport {
  id: string;
  websiteName: string;
  category: string;
  reportedIssue: string;
  riskLevel: RiskLevel;
  aiSummary: string;
  userComment?: string;
  flaggedVotes: number;
  notDeceptiveVotes: number;
  userVoted?: 'flagged' | 'notDeceptive' | null;
  date: string;
  sourceScreenshotName?: string;
}

export interface DemoSample {
  id: string;
  name: string;
  category: string;
  description: string;
  expectedRisk: RiskLevel;
  expectedScore: number;
  dataUrl: string;
  websiteUrl: string;
  mockResult: AnalysisResult;
}
