import Cookies from "js-cookie";

export function useCache() {
	function setCache(key: string, value: any, minutes = 1) {
		Cookies.set(key, JSON.stringify({ value, ts: Date.now() }), { expires: minutes / 1440 });
	}
	function getCache(key: string, maxAgeMs = 60000) {
		const raw = Cookies.get(key);
		if (!raw) return null;
		try {
			const { value, ts } = JSON.parse(raw);
			if (Date.now() - ts < maxAgeMs) return value;
		} catch {
			console.error("Failed to parse cache data for key:", key);
			return null;
		}
		return null;
	}
	return { setCache, getCache };
}
