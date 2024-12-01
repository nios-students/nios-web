<script lang="ts">
	import Contributor from '$lib/Contributor.svelte';
</script>

<div id="main">
	<h1>Welcome to NIOS Students</h1>
	  <p>NIOS-Students  is a project by「NIOS Unofficial」a community of  NIOS students</p>
	<h2>Contributors</h2>

	<div id="contributors">
		<Contributor
			name="SoundDrill"
			profile_picture="https://avatars.githubusercontent.com/u/84176052?v=4"
		/>
		<Contributor
			name="pingforhelp"
			profile_picture="https://avatars.githubusercontent.com/u/171056689?v=4"
		/>
		<Contributor
			name="PugzAreCute"
			profile_picture="https://avatars.githubusercontent.com/u/62641095?v=4"
		/>
		<Contributor
			name="Ur"
			profile_picture="https://avatars.githubusercontent.com/u/172172944?v=4"
		/>
	</div>
</div>

<style>
	#main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}
	#contributors {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
	}
</style>

!-- Add Visitor Counter Here -->
    <footer>
        <!-- hitwebcounter Code START -->
        <a href="https://www.hitwebcounter.com" target="_blank">
            <img src="https://hitwebcounter.com/counter/counter.php?page=17474895&style=0009&nbdigits=3&type=ip&initCount=" 
            title="Counter Widget" alt="Visit counter For Websites" border="0" />
        </a>
        <!-- hitwebcounter Code END -->
   
