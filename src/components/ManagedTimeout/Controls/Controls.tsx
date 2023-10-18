import { createSignal, type ComponentProps, type Setter, batch } from "solid-js";
import Timeout from "managed-timeout";
import { Control as BaseControl } from "./Control"
import { ActionControl, type TimeoutActions } from "./ActionControl";

interface ControlsProps {
	timeout: Timeout | null;
	setTimeout: Setter<Timeout | null>;
	setTracking: Setter<boolean>;
}
export function Controls(props: ControlsProps) {
	const [delay, setDelay] = createSignal(10_000);
	const createNewTimeout = () => {
		props.timeout?.cancel();
		batch(() => {
			props.setTracking(false);
			props.setTimeout(new Timeout(delay()));
		});
	};

	const Control = <T extends TimeoutActions>(contProps: Omit<ComponentProps<typeof ActionControl<T>>, "timeout">) => (
		<ActionControl
			{...contProps}
			timeout={props.timeout}
		/>
	)

	const withSuccess = (trackingState: boolean) => (val: unknown) => {
		// strict comparission with boolean
		if (val === true) {
			props.setTracking(trackingState);
		}
	}
	return (
		<fieldset>
			<legend>Controls</legend>
			<BaseControl name="Create new Timeout" onClick={createNewTimeout}>
				<input
					type="number"
					step={1}
					value={delay()}
					min={0}
					max={60_000 * 5}
					onChange={(e) => setDelay(e.currentTarget.valueAsNumber)}
				/>
			</BaseControl>
			<Control
				name="Start Timeout"
				key="start"
				code="start(cb: (to: Timeout)=>void): boolean"
				data={[(e: unknown) => {
					props.setTracking(false);
					console.log("timeout has finished!", e);
				}]}
				onClick={withSuccess(true)}
			/>
			<Control
				name="Cancel Timeout"
				key="cancel"
				onClick={withSuccess(false)}
			/>
			<Control
				name="Execute Timeout"
				key="execute"
				onClick={withSuccess(false)}
			/>
			<Control
				name="Pause Timeout"
				key="pause"
				onClick={withSuccess(false)}
			/>
			<Control
				name="Resume Timeout"
				key="resume"
				onClick={withSuccess(true)}
			/>
			<Control
				name="Reset Timeout"
				key="reset"
				code="reset(delay?: number): boolean"
				onClick={withSuccess(true)}
				data={[delay()]}
			/>
		</fieldset>
	)
}