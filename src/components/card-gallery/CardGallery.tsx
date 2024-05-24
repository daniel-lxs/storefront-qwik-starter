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
	const showLeftButton = useSignal<boolean>(false);
	const showRightButton = useSignal<boolean>(true);

	const updateButtonVisibility = $(() => {
		if (scrollContainer.value) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
			showLeftButton.value = scrollLeft > 0;
			showRightButton.value = scrollLeft < scrollWidth - clientWidth;
		}
	});

	useVisibleTask$(() => {
		const container = scrollContainer.value;
		if (container) {
			container.addEventListener('scroll', updateButtonVisibility);
			updateButtonVisibility();

			return () => {
				container.removeEventListener('scroll', updateButtonVisibility);
			};
		}
	});

	const scrollLeft = $(() => {
		if (scrollContainer.value) {
			scrollContainer.value.scrollBy({ left: -400, behavior: 'smooth' });
		}
	});

	const scrollRight = $(() => {
		if (scrollContainer.value) {
			scrollContainer.value.scrollBy({ left: 400, behavior: 'smooth' });
		}
	});

	return (
		<div class="relative space-y-2 py-10 sm:py-20">
			<div class="px-4 lg:px-6">
				<h2 class="text-2xl font-light tracking-tight text-gray-900">{title}</h2>
			</div>
			<div class="relative">
				{showLeftButton.value && (
					<button
						onClick$={scrollLeft}
						class="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 bg-primary/85 text-white p-4 rounded-full z-10"
					>
						<LuChevronLeft class="w-4 sm:w-6 h-4 sm:h-6" />
					</button>
				)}
				<div ref={scrollContainer} class="flex overflow-x-auto space-x-2 sm:space-x-4 p-4">
					{items.map((item, index) => (
						<Link href={item.link} key={index} class="flex-shrink-0 max-w-[200px] sm:max-w-[300px]">
							<div class="relative rounded-lg overflow-hidden hover:opacity-75 mx-auto">
								<div class="w-full h-auto overflow-hidden max-w-[200px] sm:max-w-[300px] max-h-[200px] sm:max-h-[300px]">
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
				{showRightButton.value && (
					<button
						onClick$={scrollRight}
						class="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2 bg-primary/85 text-white p-4 rounded-full"
					>
						<LuChevronRight class="w-4 sm:w-6 h-4 sm:h-6" />
					</button>
				)}
			</div>
		</div>
	);
});
