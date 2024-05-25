import { component$ } from '@builder.io/qwik';
import { Image } from 'qwik-image';

export default component$<{
	title: string;
	imageUrl: string;
	content: string;
	buttonCaption1: string;
	link1: string;
	buttonCaption2?: string;
	link2?: string;
}>(({ title, imageUrl, content, link1, buttonCaption1, buttonCaption2, link2 }) => {
	return (
		<div class="py-6">
			<div class="w-full relative flex-none">
				<Image
					layout="fullWidth"
					class="h-[400px] md:h-[500px] w-full object-cover"
					src={imageUrl}
					height="600"
					width="800"
				/>
				<div class="absolute inset-0 flex flex-col bg-black bg-opacity-50 justify-center items-start text-white py-8 px-6 sm:px-20 md:px-40">
					<h2 class="text-2xl md:text-3xl lg:text-5xl font-medium mb-4">{title}</h2>
					<p class="text-lg md:text-xl mb-10 sm:w-1/2">{content}</p>
					<div class="flex space-x-4">
						<a
							href={link1}
							class="inline-block px-6 py-3 sm:px-4 sm:py-2 bg-primary text-white rounded hover:bg-primary/80 transition-colors text-md sm:text-base"
						>
							{buttonCaption1}
						</a>
						{buttonCaption2 && link2 && (
							<a
								href={link2}
								class="inline-block px-6 py-3 sm:px-4 sm:py-2 bg-white text-primary rounded hover:bg-primary/80 hover:text-white transition-colors text-md sm:text-base"
							>
								{buttonCaption2}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
