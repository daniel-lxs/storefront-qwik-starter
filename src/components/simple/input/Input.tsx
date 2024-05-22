import { $, PropFunction, component$ } from '@builder.io/qwik';

interface InputProps {
	type: 'email' | 'password' | 'text';
	label: string;
	value: string;
	onChange$?: PropFunction<(event: Event, el: HTMLInputElement) => void>;
	onKeyUp$?: PropFunction<(event: KeyboardEvent, el: HTMLInputElement) => void>;
	onBlur$?: PropFunction<(event: FocusEvent, el: HTMLInputElement) => void>;
}

export default component$((props: InputProps) => {
	const handleChange = $((event: Event, el: HTMLInputElement) => {
		props.onChange$?.(event, el);
	});

	return (
		<div>
			<label class="block text-sm font-medium text-gray-700">{props.label}</label>
			<div class="mt-1">
				<input
					type={props.type}
					autoComplete="email"
					value={props.value}
					required
					onInput$={handleChange}
					class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
				/>
			</div>
		</div>
	);
});
