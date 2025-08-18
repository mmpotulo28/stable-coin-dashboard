import React, { useState } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface DashboardChartProps {
	title: string;
	icon: string;
	data: any[];
	xAxisKey: string;
	chartKey: string;
	color?: string;
	height?: number | string;
}

const ranges = [
	{ label: "6 Months", value: 6 },
	{ label: "1 Year", value: 12 },
	{ label: "2 Years", value: 24 },
	{ label: "3 Years", value: 36 },
];

export function DashboardChart({
	title,
	icon,
	data,
	xAxisKey,
	chartKey,
	color = "#006FEE",
	height = 300,
}: DashboardChartProps) {
	const [range, setRange] = useState<number>(6);
	const [startIdx, setStartIdx] = useState(0);

	const maxIdx = data.length - range;
	const canPrev = startIdx > 0;
	const canNext = startIdx < maxIdx;

	const handlePrev = () => {
		setStartIdx((idx) => Math.max(0, idx - range));
	};
	const handleNext = () => {
		setStartIdx((idx) => Math.min(maxIdx, idx + range));
	};
	const handleRangeChange = (val: number) => {
		setRange(val);
		setStartIdx(0);
	};

	const visibleData = data.slice(startIdx, startIdx + range);

	return (
		<Card className="h-[400px]">
			<CardHeader className="flex items-center gap-2">
				<Icon icon={icon} className="text-xl text-primary" />
				<span className="font-semibold">{title}</span>
			</CardHeader>
			<CardBody>
				<div className="flex items-center justify-between mb-2">
					<div className="flex gap-2">
						{ranges.map((r) => (
							<Chip
								key={r.value}
								color={range === r.value ? "primary" : "default"}
								variant={range === r.value ? "flat" : "bordered"}
								className="cursor-pointer"
								onClick={() => handleRangeChange(r.value)}>
								{r.label}
							</Chip>
						))}
					</div>
					<div className="flex gap-2">
						<Button
							isIconOnly
							variant="light"
							disabled={!canPrev}
							onPress={handlePrev}
							aria-label="Previous Range">
							<Icon icon="lucide:chevron-left" />
						</Button>
						<Button
							isIconOnly
							variant="light"
							disabled={!canNext}
							onPress={handleNext}
							aria-label="Next Range">
							<Icon icon="lucide:chevron-right" />
						</Button>
					</div>
				</div>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={visibleData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey={xAxisKey} />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey={chartKey} stroke={color} strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</CardBody>
		</Card>
	);
}
