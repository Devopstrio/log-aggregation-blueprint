import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Cell, PieChart, Pie, LineChart, Line
} from 'recharts';
import { 
  Terminal, 
  Activity, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Layers,
  ShieldCheck,
  Search
} from 'lucide-react';

const ingestionVolumeData = [
  { time: '00:00', events: 850000 },
  { time: '04:00', events: 920000 },
  { time: '08:00', events: 1250000 },
  { time: '12:00', events: 1100000 },
  { time: '16:00', events: 1450000 },
  { time: '20:00', events: 1200000 },
];

const logSeverityBreakdown = [
  { name: 'Info', value: 75, color: '#10b981' },
  { name: 'Warn', value: 15, color: '#f59e0b' },
  { name: 'Error', value: 8, color: '#ef4444' },
  { name: 'Fatal', value: 2, color: '#7f1d1d' },
];

const KPI_CARDS = [
  { title: 'Total Events Ingested', value: '4.2B', trend: 'Last 24h', color: 'emerald', icon: Database },
  { title: 'Ingestion Throughput', value: '1.2M', trend: 'EPS (Events/Sec)', color: 'emerald', icon: Zap },
  { title: 'Processing Latency', value: '45ms', trend: 'Avg. P95', color: 'emerald', icon: Activity },
  { title: 'Active Alert Rules', value: '152', trend: '8 Critical High', color: 'emerald', icon: AlertTriangle },
];

const LogDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Observability Control Plane</h1>
          <p className="text-slate-400">Institutional log aggregation, real-time analysis, and security event detection.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Query Explorer
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            New Alert Rule
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-emerald-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-emerald-400`} />
              </div>
              <div className="text-xs font-medium text-emerald-400">
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingestion Trends */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Ingestion Throughput Velocity</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ingestionVolumeData}>
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="events" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEvents)" name="Events / Sec" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Breakdown */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Log Severity Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={logSeverityBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {logSeverityBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {logSeverityBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Log Stream Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-emerald-400" />
            Live Ingestion Stream
          </h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               CONNECTED
             </div>
             <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">Open Web Console</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Timestamp</th>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Log Message</th>
                <th className="px-6 py-4 font-semibold">Trace ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { time: '10:45:22.459', service: 'auth-service', severity: 'INFO', msg: 'User authenticated successfully via OIDC', trace: 'tr-921x-459' },
                { time: '10:45:22.462', service: 'payment-api', severity: 'ERROR', msg: 'Failed to process transaction: Timeout', trace: 'tr-882y-120' },
                { time: '10:45:22.470', service: 'worker-node-12', severity: 'WARN', msg: 'Disk I/O latency exceeding threshold: 450ms', trace: 'tr-110z-883' },
              ].map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-xs text-slate-500">{log.time}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-emerald-400">{log.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      log.severity === 'ERROR' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-300 max-w-md truncate">{log.msg}</td>
                  <td className="px-6 py-4 text-xs text-slate-600 italic">{log.trace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogDashboard;
