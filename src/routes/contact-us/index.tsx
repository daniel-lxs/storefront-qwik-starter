import { component$, useSignal } from '@builder.io/qwik';
import { Button } from '~/components/buttons/Button';
import Card from '~/components/simple/card/Card';
import Input from '~/components/simple/input/Input';
import SectionHeader from '~/components/simple/section-header/SectionHeader';
import TextArea from '~/components/simple/text-area/TextArea';

export default component$(() => {
	const name = useSignal('');
	const email = useSignal('');
	const subject = useSignal('');
	const phone = useSignal('');
	const message = useSignal('');

	return (
		<>
			<SectionHeader
				extraClass="mb-8 sm:mb-12"
				title={$localize`Contact Us`}
				subtitle={$localize`We are here to help you. Please feel free to contact us.`}
			/>

			<div class="flex justify-center">
				<div class="max-w-6xl w-full sm:px-4 lg:px-8">
					<div class="flex flex-col lg:flex-row lg:justify-center lg:gap-4">
						<Card extraClass="lg:flex-1">
							<form class="space-y-6">
								<Input label={$localize`Your Name`} type="text" value={name.value} />
								<Input label={$localize`Email`} type="email" value={email.value} />
								<Input label={$localize`Phone`} type="text" value={phone.value} />
								<Input label={$localize`Subject`} type="text" value={subject.value} />
								<TextArea label={$localize`Message`} value={message.value} />
								<div class="flex justify-end">
									<Button>{$localize`Send`}</Button>
								</div>
							</form>
						</Card>

						<Card extraClass="mt-4 lg:mt-0 lg:w-1/3">
							<div class="space-y-2 sm:space-y-4">
								<div>
									<h3 class="text-lg font-medium text-gray-900">{$localize`Our Address`}</h3>
									<p class="text-sm text-gray-600">
										1234 Street Name
										<br />
										City, State, ZIP Code
									</p>
								</div>
								<div>
									<h3 class="text-lg font-medium text-gray-900">{$localize`Phone Number`}</h3>
									<p class="text-sm text-gray-600">(123) 456-7890</p>
								</div>
								<div>
									<h3 class="text-lg font-medium text-gray-900">{$localize`Email`}</h3>
									<p class="text-sm text-gray-600">info@example.com</p>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
});
