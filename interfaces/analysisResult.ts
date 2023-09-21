export interface AnalysisResult {
    file_name: string;
    tool_name: string;
    duration: number;
    solc: string;
    analysis: {
      errors: any[]; // You can define a specific interface for errors if needed
      issues: AnalysisIssue[];
    };
  }
  
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

// Example usage: