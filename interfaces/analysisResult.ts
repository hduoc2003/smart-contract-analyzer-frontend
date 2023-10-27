export interface AnalysisIssue {
  id: number;
  contract: string;
  source_map: string;
  line_no: number[];
  code: string;
  description: string;
  hint: string;
  issue_title: string;
  swcID: string;
  swc_title: string;
  swc_link: string;
  severity: string;
}

export interface AnalysisResult {
  errors: any[];
  issues: AnalysisIssue[];
}

export interface ContractAnalysis {
  file_status: string;
  file_id: string;
  file_name: string;
  tool_name: string;
  duration: number;
  solc: string;
  analysis: AnalysisResult[];
  source_code: string;
}
