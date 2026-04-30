# Architecture & Pipeline Diagrams

## 11. End-to-End Log Pipeline (Detailed)
*How logs flow from source to long-term storage.*

```mermaid
graph TD
    subgraph "Edge Collection"
        K8s[K8s DaemonSet: Fluent Bit]
        Syslog[Syslog Endpoint]
        SDK[App SDK: OpenTelemetry]
    end
    subgraph "Streaming Buffer"
        Kafka[Kafka: MSK Cluster]
        Topic1[Topic: logs.raw]
        Topic2[Topic: logs.enriched]
    end
    subgraph "Processing Tier"
        Worker[Parsing Worker]
        Enrich[Enrichment Engine]
    end
    subgraph "Search & Archive"
        OS[OpenSearch: Hot/Warm]
        S3[S3: Cold Archive]
    end

    K8s --> Topic1
    Syslog --> Topic1
    SDK --> Topic1
    Topic1 --> Worker
    Worker --> Enrich
    Enrich --> Topic2
    Topic2 --> OS
    Topic2 --> S3
```

## 13. "Log Enrichment" Data Flow
```mermaid
graph LR
    Log[Raw Log] --> GeoIP[Lookup GeoIP Location]
    Log --> CMDB[Lookup Service Owner]
    Log --> IAM[Lookup User Identity]
    GeoIP --> Enriched[Enriched JSON Record]
    CMDB --> Enriched
    IAM --> Enriched
```

## 20. Anomaly Detection State Machine
```mermaid
stateDiagram-v2
    Normal_Operation --> Baselining: 24h Training
    Baselining --> Monitoring: Pattern Established
    Monitoring --> Alerting: > 3 StdDev Deviation
    Alerting --> Mitigation: Auto-Throttle Ingestion
    Mitigation --> Normal_Operation: Pattern Stabilized
```
