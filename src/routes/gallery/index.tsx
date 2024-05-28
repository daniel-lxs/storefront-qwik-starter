import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
//import { Link } from '@builder.io/qwik-city';
import {
	LuCalendarCheck2,
	LuChevronLeft,
	LuChevronRight,
	LuPaintbrush,
	LuRuler,
	LuSparkles,
	LuUser,
} from '@qwikest/icons/lucide';
import { Image } from 'qwik-image';
import { Button } from '~/components/buttons/Button';

export default component$(() => {
	const mainImageUrl = useSignal('/homepage.png');
	const maingImageOpacity = useSignal('opacity-100');
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

	const handleSlideClick = $((imageUrl: string) => {
		if (imageUrl === mainImageUrl.value) return;
		maingImageOpacity.value = 'opacity-20';
		setTimeout(() => {
			mainImageUrl.value = imageUrl;
			maingImageOpacity.value = 'opacity-100';
		}, 200);
	});

	const galleryEntries = [
		{
			title: 'Image 1',
			imageUrl: '/homepage.png',
			description: 'Image 1',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 2',
			imageUrl: '/kitchen1.jpg',
			description: 'Image 2',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 3',
			imageUrl: '/kitchen2.jpg',
			description: 'Image 3',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 4',
			imageUrl: '/homepage.png',
			description: 'Image 4',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 5',
			imageUrl: '/kitchen2.jpg',
			description: 'Image 5',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 6',
			imageUrl: '/kitchen1.jpg',
			description: 'Image 6',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 7',
			imageUrl: '/homepage.png',
			description: 'Image 7',
			link: '/kitchen-remodel',
		},
		{
			title: 'Image 8',
			imageUrl: '/kitchen1.jpg',
			description: 'Image 8',
			link: '/kitchen-remodel',
		},
	];

	return (
		<div class="flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
			{/* Breadcrumb Navigation */}
			<nav class="w-full max-w-7xl py-4">
				<ul class="flex space-x-2 text-sm text-gray-600">
					<li>
						<a href="#" class="hover:underline">
							Home
						</a>
					</li>
					<li>/</li>
					<li>
						<a href="#" class="hover:underline">
							Projects
						</a>
					</li>
					<li>/</li>
					<li>Kitchen Remodel</li>
				</ul>
			</nav>

			{/* Main Content */}
			<div class="flex flex-col lg:flex-row w-full max-w-7xl my-8 space-y-8 lg:space-y-0 lg:space-x-8">
				{/* Main Image */}
				<div class="lg:w-2/3">
					<Image
						src={mainImageUrl.value}
						alt="Project Image"
						class={`w-full h-auto object-cover rounded-lg shadow-lg transition-opacity duration-300 ease-in-out ${maingImageOpacity.value}`}
						layout="fixed"
						height={800}
						width={1400}
					/>
					{/* Media Slider */}
					<div class="w-full max-w-7xl mt-8 flex justify-center py-2">
						<div class="flex justify-center items-center space-x-2 sm:space-x-4 py-2">
							<button class="prev-button" aria-label="Previous">
								<LuChevronLeft class="w-6 sm:w-8 h-6 sm:h-8" />
							</button>
						</div>

						<swiper-container class="w-full" space-between={spaceBetween} slides-per-view="auto">
							{galleryEntries.map((entry, index) => (
								<swiper-slide
									key={index}
									class="flex max-w-[100px] sm:max-w-[150px]"
									onClick$={() => {
										handleSlideClick(entry.imageUrl);
									}}
								>
									<div class="relative rounded-lg overflow-hidden hover:opacity-75 mx-auto">
										<div class="w-full h-auto overflow-hidden max-w-[100px] sm:max-w-[150px] max-h-[100px] sm:max-h-[150px]">
											<Image
												src={entry.imageUrl}
												alt={entry.title}
												class="object-cover object-center w-full h-auto"
												width={200}
												height={200}
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
				</div>
				{/* Information Section */}
				<div class="lg:w-1/3">
					<h2 class="text-3xl font-bold mb-4">Project Title</h2>
					<p class="text-lg text-gray-700 mb-4">
						Description of the project, details about the design, materials used, etc.
					</p>
					<ul class="text-lg text-gray-700 mb-4 list-disc list-inside">
						<li>Detail 1</li>
						<li>Detail 2</li>
						<li>Detail 3</li>
					</ul>

					{/* Sections */}
					<div class="space-y-6">
						<div>
							<div class="flex items-center mb-2">
								<LuRuler class="w-6 h-6 mr-2" />
								<h3 class="text-xl font-semibold">Measurements</h3>
							</div>
							<p class="text-lg text-gray-700">Height: 100cm, Width: 200cm, Depth: 50cm</p>
						</div>

						<div>
							<div class="flex items-center mb-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-brick-wall w-6 h-6 mr-2"
								>
									<rect width="18" height="18" x="3" y="3" rx="2" />
									<path d="M12 9v6" />
									<path d="M16 15v6" />
									<path d="M16 3v6" />
									<path d="M3 15h18" />
									<path d="M3 9h18" />
									<path d="M8 15v6" />
									<path d="M8 3v6" />
								</svg>
								<h3 class="text-xl font-semibold">Materials Used</h3>
							</div>
							<p class="text-lg text-gray-700">Solid Oak, Walnut Veneer, Stainless Steel</p>
						</div>

						<div>
							<div class="flex items-center mb-2">
								<LuPaintbrush class="w-6 h-6 mr-2" />
								<h3 class="text-xl font-semibold">Finish</h3>
							</div>
							<p class="text-lg text-gray-700">Matte Lacquer</p>
						</div>

						<div>
							<div class="flex items-center mb-2">
								<LuCalendarCheck2 class="w-6 h-6 mr-2" />
								<h3 class="text-xl font-semibold">Project Date</h3>
							</div>
							<p class="text-lg text-gray-700">Completed: January 2024</p>
						</div>

						<div>
							<div class="flex items-center mb-2">
								<LuUser class="w-6 h-6 mr-2" />
								<h3 class="text-xl font-semibold">Designer/Craftsman</h3>
							</div>
							<p class="text-lg text-gray-700">John Doe</p>
						</div>

						<div>
							<div class="flex items-center mb-2">
								<LuSparkles class="w-6 h-6 mr-2" />
								<h3 class="text-xl font-semibold">Special Features</h3>
							</div>
							<p class="text-lg text-gray-700">
								Custom-built sliding drawers, Integrated LED lighting
							</p>
						</div>
					</div>
					{/* Call to Action */}
					<div class="mt-8 text-center">
						<Button>Contact Us</Button>
					</div>
				</div>
			</div>
		</div>
	);
});
