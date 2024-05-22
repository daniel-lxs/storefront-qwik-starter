import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { LuChevronLeft, LuChevronRight } from '@qwikest/icons/lucide';
import { Image } from 'qwik-image';

export type Slide = {
	title: string;
	content: string;
	imageUrl: string;
	link: string;
	buttonCaption: string;
};

export default component$<{ items: Slide[] }>(({ items }) => {
	const currentIndex = useSignal(0);
	const isMouseOver = useSignal(false);
	const intervalId = useSignal<number | null>(null);
	const SLIDE_DURATION = 10000;

	const goToPrev = $(() => {
		currentIndex.value = (currentIndex.value - 1 + items.length) % items.length;
	});

	const goToNext = $(() => {
		currentIndex.value = (currentIndex.value + 1) % items.length;
	});

	const goToSlide = $((index: number) => {
		currentIndex.value = index;
	});

	const handleMouseEnter = $(() => {
		isMouseOver.value = true;
		clearInterval(intervalId.value as number);
	});

	const handleMouseLeave = $(() => {
		isMouseOver.value = false;
		intervalId.value = window.setInterval(
			$(() => goToNext()),
			SLIDE_DURATION
		);
	});

	useVisibleTask$(() => {
		intervalId.value = window.setInterval(
			$(() => goToNext()),
			SLIDE_DURATION
		);
		return () => clearInterval(intervalId.value as number);
	});

	return (
		<div
			class="relative overflow-hidden"
			onMouseEnter$={handleMouseEnter}
			onMouseLeave$={handleMouseLeave}
		>
			<div
				class="carousel flex transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentIndex.value * 100}%)` }}
			>
				{items.map((item, index) => (
					<div key={index} class="w-full relative flex-none">
						<Image
							layout="fullWidth"
							class="h-[400px] md:h-[500px] w-full object-cover"
							src={item.imageUrl}
							height="600"
							width="800"
						/>
						<div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start text-white py-8 px-6 sm:px-20 md:px-40">
							<h2 class="text-2xl md:text-3xl lg:text-5xl font-medium mb-4">{item.title}</h2>
							<p class="text-lg md:text-xl mb-10">{item.content}</p>
							<a
								href={item.link}
								class="inline-block px-6 py-3 sm:px-4 sm:py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-md sm:text-base"
							>
								{item.buttonCaption}
							</a>
						</div>
					</div>
				))}
			</div>
			<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
				{items.map((_, index) => (
					<button
						key={index}
						class={`w-4 sm:w-3 h-4 sm:h-3 rounded-full ${index === currentIndex.value ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'}`}
						onClick$={$(() => goToSlide(index))}
					/>
				))}
			</div>
			<div
				class={{
					'opacity-0 transition-opacity duration-500 ease-in-out': true,
					'opacity-100': isMouseOver.value,
				}}
			>
				{isMouseOver.value && (
					<>
						<button
							class="hidden sm:block sm:absolute left-4 sm:left-10 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-2 sm:p-4 rounded-full hover:bg-white/20 transition-colors"
							onClick$={goToPrev}
						>
							<LuChevronLeft class="w-4 sm:w-6 h-4 sm:h-6" />
						</button>
						<button
							class="hidden sm:block sm:absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 bg-white/10 text-white p-2 sm:p-4 rounded-full hover:bg-white/20 transition-colors"
							onClick$={goToNext}
						>
							<LuChevronRight class="w-4 sm:w-6 h-4 sm:h-6" />
						</button>
					</>
				)}
			</div>
		</div>
	);
});
