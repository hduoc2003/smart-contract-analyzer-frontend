export interface AnalysisIssue {
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
  error: {
    error: "runtime out" | "compile error" | "unsupported solc" | "undefined solc" | "unknown error",
    msg: string
  }[];

  issues: AnalysisIssue[];
}

export type AnalyzeStatus = 'Analyzing' | 'Error' | 'Completed'
export interface ContractAnalysis {
  _id: string;
  status: AnalyzeStatus;
  file_name: string;
  tool_name: string;
  duration: number;
  solc: string;
  analysis: AnalysisResult;
  source_code: string;
}
