<script type="ts">
	import { TGClient } from '$lib/client/TGClient';
	import PromptInput from '../../components/PromptInput.svelte';
	import { isBrowser } from 'telegram/platform';

	// const promises = {
	// 	qCode: new Promise([]),
	// 	qPass: new Promise([]),
	// 	qCode: new Promise([])
	// };

	let num: string;
	let tkn: string;
	let pss: () => Promise<string>;
	let cod: () => Promise<string>;

	let loginClick = async () => {
		while (pss == undefined) await setTimeout(() => console.log('Waiting pss'), 100);
		while (cod == undefined) await setTimeout(() => console.log('Waiting cod'), 100);

		const cli = new TGClient();
		cli.queryPassword = pss;
		cli.queryCode = cod;
		cli.login(num);
	};

	let tokenClick = async () => {
		while (pss == undefined) await setTimeout(() => console.log('Waiting pss'), 100);
		while (cod == undefined) await setTimeout(() => console.log('Waiting cod'), 100);

		const cli = new TGClient(tkn);
		cli.queryPassword = pss;
		cli.queryCode = cod;
		cli.login(num);
	}
</script>

<fieldset style="width: fit-content;">
	<legend>Login</legend>

	<fieldset>
		<legend>Enter phone</legend>
		<input type="text" bind:value={num} />
		<button on:click={loginClick}>OK</button>
	</fieldset>

	<PromptInput bind:promptTextbox={pss} text={'Type password'} />
	<PromptInput bind:promptTextbox={cod} text={'Type code'} />
</fieldset>

<fieldset style="width: fit-content;">
	<legend>Login with token</legend>
	<textarea bind:value={tkn} cols="175" rows="5" />
	<button on:click={tokenClick}>Login</button>
</fieldset>
