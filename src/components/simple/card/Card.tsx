import { Slot, component$ } from '@builder.io/qwik';

type Props = {
	extraClass?: string;
};

export default component$<Props>(({ extraClass = '' }) => {
	return (
		<div
			class={`bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-12 w-full space-y-8 lg:w-auto ${extraClass}`}
		>
			<Slot />
		</div>
	);
});
