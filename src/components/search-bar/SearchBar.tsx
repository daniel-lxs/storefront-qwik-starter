import { component$ } from '@builder.io/qwik';
import { LuSearch } from '@qwikest/icons/lucide';

export default component$(() => {
	return (
		<form action="/search">
			<div class="flex items-center">
				<div class="relative">
					<input
						type="search"
						name="q"
						defaultValue={''}
						placeholder={$localize`Search`}
						autoComplete="off"
						class="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-xl pl-10 md:max-w-96"
					/>
					<LuSearch class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
				</div>
			</div>
		</form>
	);
});
