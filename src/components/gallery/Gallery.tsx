import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { LuChevronLeft, LuChevronRight } from '@qwikest/icons/lucide';
import { Image } from 'qwik-image';

type Props = {
	entries: Entry[];
};

type Entry = {
	title: string;
	imageUrl: string;
	description: string;
	link: string;
};

export default component$<Props>((props: Props) => {
	const spaceBetween = useSignal(20);
	const activeSlide = useSignal(0);

	useVisibleTask$(() => {
		const secondarySwiperEl = document.querySelector(
			'swiper-container.secondary-swiper'
		) as HTMLElement;
		const mainSwiperEl = document.querySelector('swiper-container.main-swiper') as HTMLElement;
		const isMobile = window.innerWidth < 640;
		spaceBetween.value = isMobile ? 10 : 20;

		const handlePrevClick = () => {
			(secondarySwiperEl as any)?.swiper.slidePrev();
		};
		const handleNextClick = () => {
			(secondarySwiperEl as any)?.swiper.slideNext();
		};

		const prevButton = document.querySelector('.prev-button');
		const nextButton = document.querySelector('.next-button');

		prevButton?.addEventListener('click', handlePrevClick);
		nextButton?.addEventListener('click', handleNextClick);

		const synchronizeSwipers = (fromSwiperEl: HTMLElement, toSwiperEl: HTMLElement) => {
			(fromSwiperEl as any)?.addEventListener('swiperslidechange', (event: any) => {
				const { activeIndex } = event.detail[0];
				activeSlide.value = activeIndex;
				(toSwiperEl as any)?.swiper.slideTo(activeIndex);
			});
		};

		synchronizeSwipers(secondarySwiperEl, mainSwiperEl);
		synchronizeSwipers(mainSwiperEl, secondarySwiperEl);

		return () => {
			prevButton?.removeEventListener('click', handlePrevClick);
			nextButton?.removeEventListener('click', handleNextClick);
		};
	});

	return (
		<>
			<div class="relative">
				<swiper-container class="main-swiper" slides-per-view="1">
					{props.entries.map((entry, index) => (
						<swiper-slide key={index}>
							<div class="animate-pulse bg-slate-300 absolute inset-0"></div>
							<Image
								src={entry.imageUrl}
								alt="Project Image"
								class="w-full h-auto object-cover rounded-lg shadow-lg relative z-10 max-h-[300px] sm:max-h-[800px]"
								layout="fixed"
								height={800 /* TODO: MAKE RESPONSIVE ON MOBILE!!! */}
								width={1400}
							/>
						</swiper-slide>
					))}
				</swiper-container>
			</div>

			{/* Media Slider */}
			<div class="w-full max-w-7xl mt-4 flex justify-center sm:py-2">
				<div class="flex justify-center items-center space-x-2 sm:space-x-4 py-2">
					<button class="prev-button" aria-label="Previous">
						<LuChevronLeft class="w-6 sm:w-8 h-6 sm:h-8" />
					</button>
				</div>

				<swiper-container
					class="w-full secondary-swiper"
					space-between={spaceBetween.value}
					slides-per-view="auto"
					centered-slides="true"
				>
					{props.entries.map((entry, index) => (
						<swiper-slide
							key={index}
							class={`flex max-w-[50px] sm:max-w-[100px] ${
								activeSlide.value === index ? 'border-2 border-primary' : ''
							}`}
							onClick$={() => {
								const secondarySwiperEl = document.querySelector(
									'swiper-container.secondary-swiper'
								) as HTMLElement;
								(secondarySwiperEl as any)?.swiper.slideTo(index);
							}}
						>
							<div class="relative rounded-lg overflow-hidden hover:opacity-75 mx-auto">
								<div class="w-full h-auto overflow-hidden max-w-[50px] sm:max-w-[100px] max-h-[50px] sm:max-h-[100px]">
									<Image
										src={entry.imageUrl}
										alt={entry.title}
										class="object-cover object-center w-full h-auto"
										width={100}
										height={100}
										layout="fixed"
									/>
								</div>
							</div>
						</swiper-slide>
					))}
				</swiper-container>

				<button class="next-button" aria-label="Next">
					<LuChevronRight class="w-6 sm:w-8 h-6 sm:h-8" />
				</button>
			</div>
		</>
	);
});
