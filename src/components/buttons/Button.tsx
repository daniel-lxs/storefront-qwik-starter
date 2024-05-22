import { $, component$, QRL, Slot } from '@builder.io/qwik';

type Props = {
	extraClass?: string;
	onClick$?: QRL<() => void>;
};

export const Button = component$<Props>(({ extraClass = '', onClick$ }) => {
	return (
		<button
			type="button"
			class={`inline-block px-6 py-3 w-full sm:w-auto sm:px-8 sm:py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-md sm:text-base ${extraClass}`}
			onClick$={$(async () => {
				onClick$ && onClick$();
			})}
		>
			<Slot />
		</button>
	);
});
