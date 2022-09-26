<script type="ts">
	let btn: HTMLButtonElement;
	let armed = false;
	let input = '';
	let prompt = '';

	export let text: string;

	export async function promptTextbox(str: string): Promise<string> {
		// Wait control to set def
		while (btn == undefined) await setTimeout(() => {}, 1000);
		armed = true;
		return new Promise((res) => {
			console.log('Promise started');
			btn.addEventListener('click', () => {
				armed = false;
				res(input);
				input = '';
			});
		});
	}
</script>

<fieldset>
	<legend>{text}</legend>
	<input type="text" bind:value={input} disabled={!armed} />
	<button bind:this={btn} disabled={!armed}>OK</button>
</fieldset>

<style>
	fieldset {
		width: fit-content;
	}
</style>
