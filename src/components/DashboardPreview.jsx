import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const containerRef = useRef();

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '📊', badge: null },
    { id: 'analytics', label: 'Analytics', icon: '📈', badge: '3' },
    { id: 'insights', label: 'Insights', icon: '💡', badge: 'New' },
    { id: 'models', label: 'AI Models', icon: '🧠', badge: null },
    { id: 'data', label: 'Data Sources', icon: '🗄️', badge: null },
    { id: 'settings', label: 'Settings', icon: '⚙️', badge: null },
  ];

  const mockData = {
    overview: {
      stats: [
        { label: 'Total Insights', value: '2,847', change: '+12%', trend: 'up' },
        { label: 'Active Models', value: '23', change: '+3', trend: 'up' },
        { label: 'Data Sources', value: '156', change: '+8', trend: 'up' },
        { label: 'Processing Time', value: '1.2s', change: '-0.3s', trend: 'down' },
      ],
      recentActivity: [
        { id: 1, type: 'insight', title: 'Customer Behavior Pattern Detected', time: '2 min ago', status: 'new' },
        { id: 2, type: 'model', title: 'Sales Prediction Model Updated', time: '15 min ago', status: 'completed' },
        { id: 3, type: 'data', title: 'New Data Source Connected', time: '1 hour ago', status: 'processing' },
        { id: 4, type: 'alert', title: 'Anomaly Detected in User Traffic', time: '2 hours ago', status: 'warning' },
      ]
    },
    analytics: {
      charts: [
        { id: 1, title: 'Model Performance', type: 'line', data: [65, 78, 82, 89, 94, 87, 92] },
        { id: 2, title: 'Data Processing Volume', type: 'bar', data: [120, 150, 180, 220, 190, 240, 280] },
        { id: 3, title: 'Insight Categories', type: 'pie', data: [30, 25, 20, 15, 10] },
      ]
    },
    insights: {
      insights: [
        { id: 1, title: 'Revenue Optimization Opportunity', confidence: 94, impact: 'High', category: 'Sales' },
        { id: 2, title: 'Customer Churn Risk Identified', confidence: 87, impact: 'Medium', category: 'Retention' },
        { id: 3, title: 'Inventory Demand Forecast', confidence: 92, impact: 'High', category: 'Operations' },
        { id: 4, title: 'Marketing Campaign Performance', confidence: 78, impact: 'Low', category: 'Marketing' },
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const StatCard = ({ stat }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-base-300 rounded-xl p-6 border border-light-silver/10 hover:border-neon-blue/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-light-silver/60 text-sm font-medium">{stat.label}</span>
        <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
          stat.trend === 'up' 
            ? 'bg-cyan-glow/20 text-cyan-glow' 
            : 'bg-soft-purple/20 text-soft-purple'
        }`}>
          <span className="mr-1">{stat.trend === 'up' ? '↗' : '↘'}</span>
          {stat.change}
        </div>
      </div>
      <div className="text-3xl font-bold text-light-silver mb-1">{stat.value}</div>
    </motion.div>
  );

  const ChartCard = ({ chart }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="bg-base-300 rounded-xl p-6 border border-light-silver/10 hover:border-soft-purple/30 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-light-silver mb-4">{chart.title}</h3>
      <div className="h-48 bg-deep-space/50 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* Mock Chart Visualization */}
        {chart.type === 'line' && (
          <svg className="w-full h-full p-4" viewBox="0 0 300 150">
            <defs>
              <linearGradient id={`gradient-${chart.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path
              d={`M 20 ${150 - chart.data[0]} ${chart.data.map((point, i) => 
                `L ${20 + (i * 40)} ${150 - point}`
              ).join(' ')}`}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="3"
              className="animate-pulse"
            />
            <path
              d={`M 20 ${150 - chart.data[0]} ${chart.data.map((point, i) => 
                `L ${20 + (i * 40)} ${150 - point}`
              ).join(' ')} L 260 150 L 20 150 Z`}
              fill={`url(#gradient-${chart.id})`}
            />
          </svg>
        )}
        {chart.type === 'bar' && (
          <div className="flex items-end justify-center space-x-2 h-full w-full p-4">
            {chart.data.map((value, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(value / Math.max(...chart.data)) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-gradient-to-t from-neon-blue to-cyan-glow rounded-t flex-1 min-h-2"
              />
            ))}
          </div>
        )}
        {chart.type === 'pie' && (
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-cyan-glow to-soft-purple animate-spin-slow opacity-80" />
            <div className="absolute inset-2 rounded-full bg-deep-space" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-light-silver font-semibold">100%</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  const InsightCard = ({ insight }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01, x: 4 }}
      className="bg-base-300 rounded-xl p-6 border border-light-silver/10 hover:border-cyan-glow/30 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-light-silver flex-1">{insight.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          insight.impact === 'High' 
            ? 'bg-cyan-glow/20 text-cyan-glow'
            : insight.impact === 'Medium'
            ? 'bg-soft-purple/20 text-soft-purple'
            : 'bg-neon-blue/20 text-neon-blue'
        }`}>
          {insight.impact}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-light-silver/60 text-sm">{insight.category}</span>
        <div className="flex items-center space-x-2">
          <span className="text-light-silver/60 text-sm">Confidence:</span>
          <div className="w-16 h-2 bg-deep-space rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${insight.confidence}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-neon-blue to-cyan-glow"
            />
          </div>
          <span className="text-cyan-glow text-sm font-medium">{insight.confidence}%</span>
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ x: 4 }}
      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-base-300/50 transition-all duration-200 cursor-pointer"
    >
      <div className={`w-3 h-3 rounded-full ${
        activity.status === 'new' ? 'bg-cyan-glow animate-pulse' :
        activity.status === 'completed' ? 'bg-soft-purple' :
        activity.status === 'processing' ? 'bg-neon-blue animate-pulse' :
        'bg-yellow-500'
      }`} />
      <div className="flex-1">
        <p className="text-light-silver font-medium">{activity.title}</p>
        <p className="text-light-silver/60 text-sm">{activity.time}</p>
      </div>
      <div className={`px-2 py-1 rounded text-xs ${
        activity.status === 'new' ? 'bg-cyan-glow/20 text-cyan-glow' :
        activity.status === 'completed' ? 'bg-soft-purple/20 text-soft-purple' :
        activity.status === 'processing' ? 'bg-neon-blue/20 text-neon-blue' :
        'bg-yellow-500/20 text-yellow-500'
      }`}>
        {activity.status}
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            key="overview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockData.overview.stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="bg-base-300 rounded-xl p-6 border border-light-silver/10">
              <h2 className="text-xl font-semibold text-light-silver mb-6">Recent Activity</h2>
              <div className="space-y-2">
                {mockData.overview.recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {mockData.analytics.charts.map((chart) => (
              <ChartCard key={chart.id} chart={chart} />
            ))}
          </motion.div>
        );

      case 'insights':
        return (
          <motion.div
            key="insights"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {mockData.insights.insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="default"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center h-64"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-light-silver mb-2">Coming Soon</h3>
              <p className="text-light-silver/60">This section is under development</p>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-deep-space to-base-300 relative">
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-light-silver mb-6"
        >
          Dashboard Preview
          <span className="block text-transparent bg-gradient-to-r from-neon-blue via-cyan-glow to-soft-purple bg-clip-text">
            Dashboard
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-light-silver/70 max-w-3xl mx-auto mb-8"
        >
          Experience the power of AI-driven insights with our comprehensive dashboard interface
        </motion.p>
        
        {/* View Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg text-lg px-8 py-4 bg-gradient-to-r from-neon-blue to-cyan-glow border-none text-deep-space font-semibold inline-flex items-center hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">View Dashboard</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Dashboard Container */}
      <div className="container mx-auto px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-deep-space rounded-2xl border border-light-silver/10 overflow-hidden shadow-2xl max-w-7xl mx-auto"
        >
          <div className="flex h-[600px]">
            {/* Sidebar */}
            <motion.div
              animate={{ width: sidebarCollapsed ? 80 : 280 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-base-300 border-r border-light-silver/10 flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-light-silver/10">
                <div className="flex items-center justify-between">
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-cyan-glow rounded-lg flex items-center justify-center">
                        <span className="text-deep-space font-bold text-sm">AI</span>
                      </div>
                      <span className="text-light-silver font-semibold">Intelligence Hub</span>
                    </motion.div>
                  )}
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-2 rounded-lg hover:bg-deep-space/50 transition-colors"
                  >
                    <span className="text-light-silver/60">☰</span>
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                        : 'text-light-silver/70 hover:text-light-silver hover:bg-deep-space/50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.badge === 'New' 
                              ? 'bg-cyan-glow/20 text-cyan-glow'
                              : 'bg-soft-purple/20 text-soft-purple'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-light-silver/10 bg-base-300/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-light-silver capitalize">
                      {activeTab}
                    </h1>
                    <p className="text-light-silver/60 mt-1">
                      {activeTab === 'overview' && 'Monitor your AI system performance'}
                      {activeTab === 'analytics' && 'Dive deep into your data insights'}
                      {activeTab === 'insights' && 'Discover AI-generated recommendations'}
                      {activeTab === 'models' && 'Manage your AI models'}
                      {activeTab === 'data' && 'Configure your data sources'}
                      {activeTab === 'settings' && 'Customize your workspace'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 rounded-lg bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 transition-colors">
                      🔄
                    </button>
                    <button className="p-2 rounded-lg bg-cyan-glow/20 text-cyan-glow hover:bg-cyan-glow/30 transition-colors">
                      📊
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {renderContent()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;