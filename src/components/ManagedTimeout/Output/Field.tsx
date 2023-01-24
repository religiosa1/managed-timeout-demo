import type { Accessor } from "solid-js";
import type { TimeoutData } from "./TimeoutData";
import styles from "./Field.module.css";

interface FieldProps {
	title: string;
	key: keyof TimeoutData;
	data: Accessor<TimeoutData | null>;
}
export function Field(props: FieldProps) {
	return (
		<p class={styles.field}>
			<span class={styles.title}>{props.title}</span>
			<output class={styles.data}>{JSON.stringify(props.data()?.[props.key])}</output>
		</p>
	)
}