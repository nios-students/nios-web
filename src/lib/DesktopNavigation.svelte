<nav>
	<a href="/contact">Contact</a>
	<a href="/wiki/Contribute">Contribute</a>
	<a href="/wiki">Wiki</a>
	<a href="/">Home</a>
	<div id="nostyle"></div>
	<a href="/" id="odroidlogo">NIOS Students</a>
</nav>

<style>
	nav {
		border-bottom: 2px solid var(--text-color);
		padding: 10px;
		display: flex;
		flex-direction: row-reverse;
	}
	#odroidlogo {
		float: left;
		border: none;
		font-size: 1em;
	}
	#nostyle {
		flex-grow: 100;
		border: none;
	}
	nav a {
		padding: 5px;
		border-radius: var(--border-radius);
		margin: 3px;
		text-decoration: none;
		transition-duration: var(--transition-duration);
		border-bottom: 3px solid transparent;
	}
	nav a:hover {
		border-bottom: 3px solid darkgoldenrod;
		transition-duration: var(--transition-duration);
	}
</style>
