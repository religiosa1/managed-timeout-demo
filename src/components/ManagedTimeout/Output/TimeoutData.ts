import type { Timeout } from "managed-timeout"

export type TimeoutDataKeys = {
  [K in keyof Timeout]-?: Timeout[K] extends Function ? never : K extends string ? K : never;
}[keyof Timeout];

export type TimeoutData = {
	[K in TimeoutDataKeys]: Timeout[K]
}

export function getTimeoutData(to: Timeout): TimeoutData {
	const data: any = {};
	const keys = Reflect.ownKeys(Object.getPrototypeOf(to)) as Array<keyof Timeout>;
	for (const key of keys) {
		const value = to[key]
		if (typeof value === "function") {
			continue;
		}
		data[key] = value;
	}
	return data;
}