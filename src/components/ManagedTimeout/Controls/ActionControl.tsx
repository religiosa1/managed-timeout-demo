import { createSignal } from "solid-js";
import type { Timeout } from "managed-timeout";
import { Control } from "./Control";


export type TimeoutActions = {
  [K in keyof Timeout]-?: Timeout[K] extends Function ? K : never;
}[keyof Timeout];

interface ControlProps<T extends TimeoutActions> {
	key: T;
	timeout: Timeout | null;
	name: string;
	code?: string;
	data?: Readonly<Parameters<Timeout[T]>>;
	onClick?: (data: unknown) => void;
}
export function ActionControl<T extends TimeoutActions>(props: ControlProps<T>) {
	const [retval, setRetval] = createSignal<string>("");
	const code = () => props.code ?? `${String(props.key)}(): boolean`;
	const handleClick = () => {
		let data: unknown;
		try {
			const item = props.timeout?.[props.key];
			if (item instanceof Function) {
				// @ts-ignore
				data = item.apply(props.timeout!, props.data ?? []);
			} else {
				data = "not a function";
			}
		} catch (e) {
			console.warn("error occured", e);
			data = e;
		}
		setRetval(JSON.stringify(data ?? null));
		props.onClick?.(data);
	};
	return (
		<Control
			name={props.name}
			code={code()}
			onClick={handleClick}
			disabled={!props.timeout}
		>
			<code title="return value">{retval()}</code>
		</Control>
	)
}