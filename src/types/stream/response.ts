export type StreamApiResponse<T = any> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: StreamError;
    };

// error
interface StreamErrorDetails {
  cause?: unknown;
  description?: string;
}

export interface StreamErrorInfo {
  message: string; // how to fix error
  statusCode: number;
  details: StreamErrorDetails;
}

export interface StreamError extends StreamErrorInfo {
  timestamp: number;
  path: string;
}
