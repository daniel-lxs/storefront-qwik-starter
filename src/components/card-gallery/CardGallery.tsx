import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { LuChevronLeft, LuChevronRight } from '@qwikest/icons/lucide';
import { Image } from 'qwik-image';

export interface CardGalleryProps {
	title: string;
	items: Item[];
}

export type Item = {
	title: string;
	imageUrl: string;
	link: string;
};

export default component$(({ title, items }: CardGalleryProps) => {
	const scrollContainer = useSignal<HTMLDivElement>();
	const itemWidth = useSignal(300 + 16); // if mobile it should be 200 + 16
	const containerWidth = useSignal<number>(0);
	const translateX = useSignal<number>(0);

	useVisibleTask$(() => {
		const isMobile = window.innerWidth < 640;
		itemWidth.value = isMobile ? 200 + 8 : 300 + 16;
		if (scrollContainer.value) {
			containerWidth.value = scrollContainer.value.offsetWidth;
			translateX.value = 0;
		}
	});

	const handleScrollLeft = $(() => {
		if (scrollContainer.value) {
			translateX.value += itemWidth.value;
			if (translateX.value > 0) {
				translateX.value = 0;
			}
			scrollContainer.value.style.transform = `translate3d(${translateX.value}px, 0, 0)`;
		}
	});

	const handleScrollRight = $(() => {
		if (scrollContainer.value) {
			const maxTranslateX = -(scrollContainer.value.scrollWidth - containerWidth.value);
			translateX.value -= itemWidth.value;
			if (translateX.value < maxTranslateX) {
				translateX.value = maxTranslateX;
			}
			scrollContainer.value.style.transform = `translate3d(${translateX.value}px, 0, 0)`;
		}
	});

	return (
		<div class="relative space-y-2 py-10 sm:py-16">
			<div class="flex justify-center items-center px-2 sm:px-4 lg:px-6 space-x-2 sm:space-x-4">
				<button onClick$={() => handleScrollLeft()} class="text-black p-4 rounded-full">
					<LuChevronLeft class="w-4 sm:w-6 h-4 sm:h-6" />
				</button>
				<h2 class="text-2xl font-light tracking-tight text-gray-900">{title}</h2>
				<button onClick$={() => handleScrollRight()} class="text-black p-4 rounded-full">
					<LuChevronRight class="w-4 sm:w-6 h-4 sm:h-6" />
				</button>
			</div>
			<div class="relative overflow-hidden">
				<div
					ref={scrollContainer}
					class="flex space-x-2 sm:space-x-4 p-2 sm:p-4 transition-transform duration-300"
				>
					{items.map((item, index) => (
						<Link href={item.link} key={index} class="flex-shrink-0 max-w-[200px] sm:max-w-[300px]">
							<div class="relative rounded-lg overflow-hidden hover:opacity-75 mx-auto">
								<div class="w-full h-auto overflow-hidden max-w-[200px] sm:max-w-[300px]">
									<Image
										src={item.imageUrl}
										alt={item.title}
										class="object-cover object-center w-full h-auto"
										width={300}
										height={300}
										layout="fixed"
									/>
								</div>
								<div class="absolute w-full bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
								<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
									{item.title}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
});
