<script lang="ts">
	import { onMount } from 'svelte';

	let nav_height = 0;

	onMount(() => {
		nav_height = document.getElementById('nav_actual').offsetHeight;

		for (let element of document.getElementsByClassName('nav_link')) {
			element.addEventListener('click', onClick);
		}
	});
	export let open: boolean = false;
	export let onClick = () => {
		open = !open;

		let hamburger = document.getElementById('hamburger');
		hamburger.classList.add('rotate_hamburger');
		``;
		window.setTimeout(() => {
			hamburger.classList.remove('rotate_hamburger');
		}, 750);

		if (open) {
			let dropdown = document.getElementById('nav_actual');
			dropdown.style.top = '0';
			dropdown.classList.add('animate_dropdown');
			window.setTimeout(() => {
				dropdown.classList.remove('animate_dropdown');
			}, 750);
		} else {
			let dropdown = document.getElementById('nav_actual');
			dropdown.style.top = 'calc(var(--my-height)*-1)';
			dropdown.classList.add('animate_dropup');
			window.setTimeout(() => {
				dropdown.classList.remove('animate_dropup');
			}, 750);
		}
	};
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>

<div id="navbar_container">
	<p>NIOS Students</p>
	<div id="spacer"></div>
	<button on:click={onClick()} type="button" id="hamburger_button">
		<span class="material-symbols-outlined" id="hamburger">menu</span>
	</button>
</div>

<div id="nav_actual" style="--my-height: {nav_height}px">
	<a href="/" class="nav_link">Home</a>
	<a href="/wiki" class="nav_link">Wiki</a>
	<a href="/wiki/Contribute" class="nav_link">Contribute</a>
	<a href="/contact" class="nav_link">Contact</a>
</div>

<style>
	#navbar_container {
		display: flex;
		flex-direction: row;
	}

	#spacer {
		flex-grow: 999;
	}
	p {
		margin: 16px;
	}
	#hamburger {
		padding: 10px;
		z-index: 100;
		user-select: none;
		animation-duration: 750ms;
		position: relative;
		color: var(--text-color);
	}

	#hamburger_button {
		border-radius: 10px;
		background: none;
		z-index: 100;
		border: none;
		outline: none;
	}

	#hamburger_button:hover {
		outline: none;
		border: none;
	}

	#hamburger_button:active {
		outline: none;
		border: none;
	}

	#nav_actual {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		background-color: var(--lighter-color);
		animation-duration: 750ms;
		position: absolute;
		width: 100vw;
		margin: 0;
		padding-top: 20px;
		padding-bottom: 20px;
		top: calc(-1 * var(--my-height));
	}

	@keyframes rotate_hamburger {
		from {
			rotate: 0turn;
		}
		to {
			rotate: 0.5turn;
		}
	}

	:global(.rotate_hamburger) {
		animation: rotate_hamburger;
	}

	@keyframes animate_dropdown {
		from {
			top: calc(var(--my-height) * -1);
		}
		to {
			top: 0;
		}
	}

	:global(.animate_dropdown) {
		animation: animate_dropdown;
	}

	:global(.animate_dropup) {
		animation: animate_dropdown;
		animation-direction: reverse;
	}
	#navbar_container {
		border-bottom: 2px solid var(--text-color);
	}
</style>
