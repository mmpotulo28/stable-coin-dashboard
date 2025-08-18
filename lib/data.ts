function generateTrend(base: number, count: number, min: number, max: number) {
	const arr = [];
	let value = base;
	for (let i = 0; i < count; i++) {
		const fluctuation = Math.floor(Math.random() * (max - min + 1)) + min;
		// Randomly decide up or down
		value += Math.random() > 0.5 ? fluctuation : -fluctuation;
		if (value < 0) value = base; // Prevent negative values
		arr.push(value);
	}
	return arr;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const labels = [...months]; // Start with the first year
for (let y = 1; y <= 5; y++) {
	for (let m = 0; m < months.length; m++) {
		labels.push(`${months[m]}${y > 1 ? y : ""}`);
	}
}

const salesTrend = generateTrend(5000, 60, 200, 1500);
export const salesData = labels.slice(0, 50).map((month, i) => ({
	month,
	sales: salesTrend[i] + Math.floor(Math.random() * 500 - 250),
}));

const userTrend = generateTrend(1000, 60, 10, 200);
export const userGrowthData = labels.slice(0, 50).map((month, i) => ({
	month,
	users: userTrend[i] + Math.floor(Math.random() * 50 - 25),
}));

const revenueTrend = generateTrend(8000, 60, 300, 2000);
export const revenueData = labels.slice(0, 50).map((month, i) => ({
	month,
	revenue: revenueTrend[i] + Math.floor(Math.random() * 1000 - 500),
}));
