import { $, PropFunction, component$ } from '@builder.io/qwik';

interface InputProps {
	label: string;
	value: string;
	onChange$?: PropFunction<(event: Event, el: HTMLTextAreaElement) => void>;
	onKeyUp$?: PropFunction<(event: KeyboardEvent, el: HTMLTextAreaElement) => void>;
	onBlur$?: PropFunction<(event: FocusEvent, el: HTMLTextAreaElement) => void>;
}

export default component$((props: InputProps) => {
	const handleChange = $((event: Event, el: HTMLTextAreaElement) => {
		props.onChange$?.(event, el);
	});

	return (
		<div>
			<label class="block text-sm font-medium text-gray-700">{props.label}</label>
			<div class="mt-1">
				<textarea
					value={props.value}
					required
					rows={10}
					onInput$={handleChange}
					onKeyUp$={props.onKeyUp$}
					onBlur$={props.onBlur$}
					class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
				/>
			</div>
		</div>
	);
});
