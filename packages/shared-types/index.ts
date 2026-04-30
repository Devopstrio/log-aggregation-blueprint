export enum LogSeverity {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
  FATAL = "FATAL"
}

export enum LogSource {
  KUBERNETES = "KUBERNETES",
  AWS_CLOUDWATCH = "AWS_CLOUDWATCH",
  AZURE_MONITOR = "AZURE_MONITOR",
  GCP_LOGGING = "GCP_LOGGING",
  SYSLOG = "SYSLOG",
  APPLICATION = "APPLICATION",
  SECURITY_EDR = "SECURITY_EDR"
}

export interface LogEntry {
  id: string;
  timestamp: string;
  severity: LogSeverity;
  source: LogSource;
  service: string;
  message: string;
  traceId?: string;
  spanId?: string;
  metadata: Record<string, any>;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: string; // e.g. "count(severity=ERROR) > 100 per 1m"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  enabled: boolean;
  notificationChannels: string[];
}

export interface IngestionStats {
  throughput: number; // logs per second
  errorRate: number;
  latencyMs: number;
  bufferUsage: number;
}
