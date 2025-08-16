import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

interface DashboardChartProps {
	data: any[];
	xAxisKey: string;
	chartKey: string;
	color?: string;
	height?: number | string;
}

export function DashboardChart({
	data,
	xAxisKey,
	chartKey,
	color = "#006FEE",
	height = 300,
}: DashboardChartProps) {
	return (
		<div style={{ width: "100%", height }}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={xAxisKey} />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey={chartKey} stroke={color} strokeWidth={2} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
