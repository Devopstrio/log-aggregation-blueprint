import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LogDashboard from './pages/LogDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The Log Aggregation engine is currently processing high-velocity telemetry streams and optimizing OpenSearch shard allocation. Advanced correlation and anomaly detection modules will be fully operational once the Kafka cluster synchronization is finalized.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<LogDashboard />} />
          <Route path="/stream" element={<Placeholder name="Real-Time Log Stream Viewer" />} />
          <Route path="/analytics" element={<Placeholder name="Log Analytics & Trend Detection" />} />
          <Route path="/alerts" element={<Placeholder name="Log-Based Alerting Center" />} />
          <Route path="/security" element={<Placeholder name="Security Logs & SIEM Integration" />} />
          <Route path="/retention" element={<Placeholder name="Retention & Archiving Lifecycle" />} />
          <Route path="/infra" element={<Placeholder name="Infrastructure Health & Telemetry" />} />
          <Route path="/audit" element={<Placeholder name="Compliance Audit & Control Logs" />} />
          <Route path="/reports" element={<Placeholder name="Executive Observability Reporting" />} />
          <Route path="/settings" element={<Placeholder name="System & Collector Settings" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
