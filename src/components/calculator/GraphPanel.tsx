"use client";

import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';

export interface GraphData {
  x: number;
  y: number;
  [key: string]: number;
}

export interface GraphPanelProps {
  title: string;
  data: GraphData[];
  xKey: string;
  yKey: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  domainColor?: string; // Hex color or basic tailwind class value e.g. "#F59E0B"
  className?: string;
}

export default function GraphPanel({
  title,
  data,
  xKey,
  yKey,
  xAxisLabel,
  yAxisLabel,
  domainColor = "#F59E0B", // Default mechanical
  className
}: GraphPanelProps) {
  
  if (!data || data.length === 0) return null;

  return (
    <div className={cn("flex flex-col p-6 rounded-xl bg-surface border border-border mt-6 w-full shadow-sm", className)}>
      <h3 className="text-lg font-semibold text-text-primary mb-6">{title}</h3>
      
      <div className="h-[300px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3A" vertical={false} />
            
            <XAxis 
              dataKey={xKey} 
              stroke="#9898B0" 
              tick={{ fill: '#9898B0', fontSize: 12 }}
              tickMargin={10}
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', fill: '#9898B0', fontSize: 13, offset: 5 } : undefined}
            />
            
            <YAxis 
              stroke="#9898B0" 
              tick={{ fill: '#9898B0', fontSize: 12 }}
              tickMargin={10}
              domain={['auto', 'auto']}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#9898B0', fontSize: 13, offset: -10 } : undefined}
            />
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#1C1C28', borderColor: '#2A2A3A', borderRadius: '8px', color: '#F4F4F8' }}
              itemStyle={{ color: domainColor }}
              labelStyle={{ color: '#9898B0', marginBottom: '4px' }}
              cursor={{ stroke: '#5A5A78', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            
            <ReferenceLine y={0} stroke="#5A5A78" strokeWidth={1} />
            
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={domainColor} 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: domainColor, stroke: '#12121A', strokeWidth: 2 }}
              isAnimationActive={false} // Disable animation to prevent layout jumps on typing
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
