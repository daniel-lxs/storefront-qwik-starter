import { $, component$, useSignal } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import XCircleIcon from '~/components/icons/XCircleIcon';
import Checkbox from '~/components/simple/checkbox/Checkbox';
import Input from '~/components/simple/input/Input';
import { loginMutation } from '~/providers/shop/account/account';

export default component$(() => {
	const navigate = useNavigate();
	const email = useSignal('');
	const password = useSignal('');
	const rememberMe = useSignal(true);
	const error = useSignal('');

	const login = $(async () => {
		const { login } = await loginMutation(email.value, password.value, rememberMe.value);
		if (login.__typename === 'CurrentUser') {
			navigate('/account');
		} else {
			error.value = login.message;
		}
	});
	return (
		<div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 class="mt-6 text-center text-3xl text-gray-900">Sign in to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or{' '}
					<Link href="/sign-up" class="font-medium text-primary-600 hover:text-primary-500">
						register a new account
					</Link>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div class="mb-6 bg-yellow-50 border border-yellow-400 text-yellow-800 rounded p-4 text-center text-sm">
						<p>Demo credentials</p>
						<p>
							Email address: <span class="font-bold">test@vendure.io</span>
						</p>
						<p>
							Password: <span class="font-bold">test</span>
						</p>
					</div>
					<div class="space-y-6">
						<div>
							<Input
								label="Email address"
								type="email"
								value={email.value}
								onChange$={(_, el) => (email.value = el.value)}
							/>
						</div>

						<div>
							<Input
								type="password"
								label="Password"
								value={password.value}
								onChange$={(_, el) => (password.value = el.value)}
								onKeyUp$={(ev, el) => {
									if (ev.key === 'Enter' && !!el.value) {
										login();
									}
								}}
							/>
						</div>

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<Checkbox type="checkbox" onChange$={(_, el) => (rememberMe.value = el.checked)} />
								<label class="ml-2 block text-sm text-gray-900">Remember me</label>
							</div>

							<div class="text-sm">
								<button
									onClick$={() => navigate('/forgot-password')}
									class="font-medium text-primary-600 hover:text-primary-500"
								>
									Forgot your password?
								</button>
							</div>
						</div>

						{error.value !== '' && (
							<div class="rounded-md bg-red-50 p-4">
								<div class="flex">
									<div class="flex-shrink-0">
										<XCircleIcon />
									</div>
									<div class="ml-3">
										<h3 class="text-sm font-medium text-red-800">
											We ran into a problem signing you in!
										</h3>
										<p class="text-sm text-red-700 mt-2">{error.value}</p>
									</div>
								</div>
							</div>
						)}
						<div>
							<button
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								onClick$={login}
							>
								Sign in
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});
