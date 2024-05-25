import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
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
	const spaceBetween = useSignal(30);
	useVisibleTask$(() => {
		const isMobile = window.innerWidth < 640;
		spaceBetween.value = isMobile ? 20 : 30;
		const handlePrevClick = () => {
			const swiperEl = document.querySelector('swiper-container');
			(swiperEl as any)?.swiper.slidePrev();
		};

		const handleNextClick = () => {
			const swiperEl = document.querySelector('swiper-container');
			(swiperEl as any)?.swiper.slideNext();
		};

		const prevButton = document.querySelector('.prev-button');
		const nextButton = document.querySelector('.next-button');

		prevButton?.addEventListener('click', handlePrevClick);
		nextButton?.addEventListener('click', handleNextClick);

		return () => {
			prevButton?.removeEventListener('click', handlePrevClick);
			nextButton?.removeEventListener('click', handleNextClick);
		};
	});

	return (
		<div class="text-center py-10 sm:py-14">
			<div class="flex justify-center items-center space-x-2 sm:space-x-4 py-2">
				<button class="prev-button p-4" aria-label="Previous">
					<LuChevronLeft class="w-6 sm:w-8 h-6 sm:h-8" />
				</button>

				<h2 class="text-2xl font-light tracking-tight text-gray-900">{title}</h2>

				<button class="next-button p-4" aria-label="Next">
					<LuChevronRight class="w-6 sm:w-8 h-6 sm:h-8" />
				</button>
			</div>

			<swiper-container
				class="w-full"
				space-between={spaceBetween}
				slides-per-view="auto"
				loop={true}
			>
				{items.map((item, index) => (
					<swiper-slide key={index} class="flex max-w-[200px] sm:max-w-[300px]">
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
								<div class="absolute w-full bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"></div>
								<div class="flex justify-center">
									<span class="absolute w-full bottom-2 text-xl font-bold text-white text-center">
										{item.title}
									</span>
								</div>
							</div>
						</Link>
					</swiper-slide>
				))}
			</swiper-container>
		</div>
	);
});
