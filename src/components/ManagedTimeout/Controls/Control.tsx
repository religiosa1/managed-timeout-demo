import { type JSXElement, children, splitProps, Show, type ComponentProps } from "solid-js";
import styles from "./Control.module.css";

interface ControlProps extends Omit<ComponentProps<"button">, "name"> {
	name: JSXElement;
	children?: JSXElement;
	code?: JSXElement
}
export function Control(props: ControlProps) {
	const [, btnProps] = splitProps(props, ["code", "name", "children"]);
	const code = children(() => props.code);
	return (
		<div class={styles.control}>
			<button
				class={styles.button}
				type="button"
				{...btnProps}
			>
				{props.name}
			</button>
			<output class={styles.output}>
				{props.children}
			</output>
			<Show when={code}>
				<code class={styles.code}>
					{code()}
				</code>
			</Show>
		</div>
	)
}