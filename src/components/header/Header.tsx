import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { LuShoppingCart, LuUser } from '@qwikest/icons/lucide';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';

import SearchBar from '../search-bar/SearchBar';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const loc = useLocation();

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
			}
		}
	});

	const logout = $(async () => {
		await logoutMutation();
		// force hard refresh
		window.location.href = '/';
	});

	return (
		<div class="bg-white transform shadow-xl sticky top-0 z-20 animate-dropIn">
			<header>
				<div class="max-w-6xl mx-auto p-4 flex items-center justify-center space-x-12 sm:space-x-8 ">
					<div class="flex justify-center space-x-6">
						<button
							class="block sm:hidden text-primary"
							onClick$={() => (appState.showMenu = !appState.showMenu)}
						>
							<MenuIcon />
						</button>
						<h1 class="text-primary w-10">
							<Link href="/">
								<img src={`/logo-72-72.png`} width={40} height={31} alt="Vendure logo" />
							</Link>
						</h1>
					</div>
					<div class="hidden space-x-4 sm:block">
						<Link
							href="/"
							class={`text-sm md:text-base hover:text-primary/80 transition-colors ${loc.url.pathname === '/' ? 'text-primary' : 'text-gray-700'}`}
						>
							{$localize`Home`}
						</Link>
						{collections.map((collection) => (
							<Link
								class={`text-sm md:text-base hover:text-primary/80 transition-colors ${
									loc.url.pathname === `/shop/collections/${collection.slug}/`
										? 'text-primary/80'
										: 'text-gray-700'
								}`}
								href={`/shop/collections/${collection.slug}`}
								key={collection.id}
							>
								{collection.name}
							</Link>
						))}
					</div>
					<div>
						<div class="hidden sm:block">
							<SearchBar />
						</div>
					</div>
					<div class="flex justify-center space-x-2">
						<div class="">
							<button
								name="Cart"
								aria-label={`${totalQuantity} items in cart`}
								class="relative w-9 h-9 hover:bg-primary/20 transition-colors rounded text-primary p-1"
								onClick$={() => (appState.showCart = !appState.showCart)}
							>
								<LuShoppingCart class="w-6 h-6" />
								{totalQuantity ? (
									<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
										{totalQuantity}
									</div>
								) : (
									''
								)}
							</button>
						</div>
						<div class="flex mr-[60px] 2xl:mr-0 h-9">
							<Link
								href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
								class={
									'flex items-center space-x-1 py-4 px-2 rounded text-primary hover:bg-primary/20 transition-colors'
								}
							>
								<LuUser class="w-6 h-6" />
								<span class="mt-1 text-primary">
									{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
										? $localize`My Account`
										: $localize`Sign In`}
								</span>
							</Link>
							{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
								<button onClick$={logout} class="text-gray-700">
									<div class="flex items-center cursor-pointer">
										<span class="mr-2">{$localize`Logout`}</span>
										<LogoutIcon />
									</div>
								</button>
							)}
						</div>
					</div>
				</div>
			</header>
		</div>
	);
});
