"use client"

import type * as React from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { XAxisProps, YAxisProps, BarProps } from "recharts"
type ChartContainerProps = {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  children: React.ReactNode
  padding?: { top?: number; right?: number; left?: number; bottom?: number }
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ data, xAxisKey, yAxisKey, children, padding }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={padding}>
        <XAxis dataKey={xAxisKey} />
        <YAxis dataKey={yAxisKey} />
        {children}
      </BarChart>
    </ResponsiveContainer>
  )
}

export const ChartGrid: React.FC = () => {
  return <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
}

export const ChartTooltip: React.FC<{ children: (props: any) => React.ReactNode }> = ({ children }) => {
  return <Tooltip content={children} />
}

export const ChartTooltipContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="p-2 bg-white border rounded-md shadow-md">{children}</div>
}

export const ChartBar: React.FC<BarProps> = (props) => {
  return <Bar {...(props as any)} />;
};


export const ChartXAxis: React.FC<XAxisProps> = (props) => {
  return <XAxis {...props} />
}

export const ChartYAxis: React.FC<YAxisProps> = (props) => {
  return <YAxis {...props} />
}

export const Chart: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

