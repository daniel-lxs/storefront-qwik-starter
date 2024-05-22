import { $, PropFunction, component$ } from '@builder.io/qwik';

interface CheckboxProps {
	type: 'text' | 'checkbox' | 'radio';
	onChange$?: PropFunction<(event: Event, el: HTMLInputElement) => void>;
	checked?: boolean;
}

export default component$((props: CheckboxProps) => {
	const handleChange = $((event: Event, el: HTMLInputElement) => {
		props.onChange$?.(event, el);
	});

	return (
		<input
			type={props.type}
			checked={props.checked}
			onChange$={handleChange}
			class="h-4 w-4 text-primary-600 focus:ring-primary border-gray-300 rounded"
		/>
	);
});
