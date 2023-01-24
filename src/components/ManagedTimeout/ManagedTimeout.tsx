import { createSignal } from "solid-js";
import styles from "./ManagedTimeout.module.css";
import type { Timeout } from "managed-timeout";
import { Controls } from "./Controls";
import { Output } from "./Output";

export function ManagedTimeout() {
	const [timeout, setTimeout] = createSignal<Timeout | null>(null);
	const [tracking, setTracking] = createSignal(false, { equals: false });
	return (
		<div class={styles.ManagedTimeout}>
			<Controls
				timeout={timeout()}
				setTimeout={setTimeout}
				setTracking={setTracking}
			/>
			<Output
				timeout={timeout()}
				tracking={tracking()}
			/>
		</div>
	);
}