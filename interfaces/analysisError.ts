export type AnalysisError = {
    error: string;
    msg: AnalysisErrorMsg[];
  };
  
  export type AnalysisErrorMsg = {
    description: string;
    error_title: string;
    line_no: number;
    start_char_idx: number;
    typeDetect: "Error" | "Warning";
  };
  