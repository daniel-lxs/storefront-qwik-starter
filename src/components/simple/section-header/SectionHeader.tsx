import { component$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';

type Props = {
	extraClass?: string;
	title: string;
	subtitle: string;
};

export default component$<Props>(({ title, subtitle, extraClass }) => {
	return (
		<div class={`relative flex flex-col justify-center ${extraClass}`}>
			<div class="relative w-full h-64 overflow-hidden">
				<Image
					layout="fullWidth"
					src="/homepage.png"
					alt="Contact us"
					height="600"
					width="800"
					class="object-contain object-center w-full h-full"
				/>
				<div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 lg:px-8">
					<h2 class="text-2xl sm:text-4xl text-white font-bold">{title}</h2>
					<p class="mt-2 text-lg sm:text-xl text-white text-center">{subtitle}</p>
				</div>
			</div>
		</div>
	);
});
