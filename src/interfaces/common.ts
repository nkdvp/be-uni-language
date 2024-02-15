interface I_CommonInfo {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

interface I_FunctionResult {
  succeed: boolean;
  message?: string;
  meta?: any;
}

export { I_CommonInfo, I_FunctionResult };
