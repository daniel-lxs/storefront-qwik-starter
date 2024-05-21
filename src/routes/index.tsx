import { component$, useContext } from '@builder.io/qwik';
import Carousel, { CarouselItem } from '~/components/carousel/Carousel';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;

	const carouselItems: CarouselItem[] = [
		{
			title: 'Who are we and what do we do?',
			content: 'We are an experienced team of wood workers and craftsmen.',
			imageUrl: HOMEPAGE_IMAGE,
			link: '/',
			buttonCaption: 'More Info',
		},
		{
			title: 'Kitchen and Cabinet Makers',
			content: 'We specialize in custom kitchen and cabinet making.',
			imageUrl: HOMEPAGE_IMAGE,
			link: '/',
			buttonCaption: 'Request a Quote',
		},
	];

	return (
		<div>
			<div class="relative h-[600px]">
				<Carousel items={carouselItems} />
			</div>

			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mt-4 flow-root">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4">
								<h2 class="text-2xl font-light tracking-tight text-gray-900">{$localize`Shop by Category`}</h2>
							</div>
							<div class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								{collections.map((collection) =>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : null
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
});
