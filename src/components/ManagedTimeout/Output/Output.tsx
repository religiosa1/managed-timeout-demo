import { createEffect, createSignal } from "solid-js";
import type { Timeout } from "managed-timeout";
import { getTimeoutData, type TimeoutData } from "./TimeoutData";
import { Field } from "./Field";

interface OutputProps {
	timeout: Timeout | null;
	tracking: boolean;
}
export function Output(props: OutputProps) {
	const [data, setData] = createSignal<TimeoutData | null>(null);

	createEffect(() => {
		function step() {
			if (props.timeout) {
				setData(getTimeoutData(props.timeout))
			}
			if (props.timeout && props.tracking) {
				requestAnimationFrame(step);
			}
		};

		if (props.timeout && props.tracking) {
			requestAnimationFrame(step);
		} else {
			requestAnimationFrame(step);
		}
	}, [props.timeout, props.tracking]);

	return (
		<fieldset>
			<legend>Timeout data</legend>
			<Field
				title="delay: number"
				key="delay"
				data={data}
			/>
			<Field
				title="state: TimeoutState"
				key="state"
				data={data}
			/>
			<Field
				title="timeLeft: delay"
				key="timeLeft"
				data={data}
			/>
			<Field
				title="timePassed: delay"
				key="timePassed"
				data={data}
			/>
			<Field
				title="paused: boolean"
				key="paused"
				data={data}
			/>
			<Field
				title="isPending: boolean"
				key="isPending"
				data={data}
			/>
			<Field
				title="isStarted: boolean"
				key="isStarted"
				data={data}
			/>
			<Field
				title="isCanceled: boolean"
				key="isCanceled"
				data={data}
			/>
			<Field
				title="isFinished: boolean"
				key="isFinished"
				data={data}
			/>
			<Field
				title="isFinishedPreemptively: boolean"
				key="isFinishedPreemptively"
				data={data}
			/>
		</fieldset>
	)
}