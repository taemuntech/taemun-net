import React from 'react';
import { TRUST_METRICS } from '../data/mockData';
import { WaterDrop, Leaf, Zap, Building2, TrendingUp, CheckCircle, Gauge, Handshake } from './Icons';

interface MetricsBarProps {
  id?: string;
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ id = "metrics-bar" }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'water_drop':
        return <WaterDrop className="w-[18px] h-[18px] text-[#00685f]" />;
      case 'energy_savings_leaf':
        return <Leaf className="w-[18px] h-[18px] text-[#00685f]" />;
      case 'electric_bolt':
        return <Zap className="w-[18px] h-[18px] text-[#00685f]" />;
      case 'corporate_fare':
        return <Building2 className="w-[18px] h-[18px] text-[#00685f]" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending_up':
        return <TrendingUp className="w-3 h-3 text-[#006398]" />;
      case 'verified':
        return <CheckCircle className="w-3 h-3 text-[#00685f]" />;
      case 'speed':
        return <Gauge className="w-3 h-3 text-[#006398]" />;
      case 'handshake':
        return <Handshake className="w-3 h-3 text-[#00685f]" />;
      default:
        return null;
    }
  };

  return (
    <div id={id} className="relative z-10 w-full bg-white/85 backdrop-blur-md border-t border-[#bcc9c6]/30 py-4">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={idx}
              id={`metric-card-${idx}`}
              className="p-4 rounded-xl bg-white/90 border border-[#bcc9c6]/40 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] text-[#3d4947] font-medium">{metric.title}</span>
                {getIcon(metric.icon)}
              </div>
              <div className="flex items-baseline gap-1 my-1">
                <span
                  className={`font-mono text-2xl lg:text-[28px] font-bold tracking-tight ${
                    metric.isPrimaryColor ? 'text-[#00685f]' : 'text-[#0b1c30]'
                  }`}
                >
                  {metric.value}
                </span>
                <span className="font-mono text-xs text-[#3d4947] font-semibold">{metric.unit}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-[#006398]">
                {getTrendIcon(metric.trendIcon)}
                <span className={metric.trendIcon === 'verified' || metric.trendIcon === 'handshake' ? 'text-[#00685f]' : 'text-[#006398]'}>
                  {metric.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
