<template>
	<div class="home">
		<h1>This is the HomePage</h1>
	</div>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from '../layouts/Default'

export default {
	name: 'home',
	components: {},
	created() {
		this.$emit('update:layout', DefaultLayout)
	}
}
</script>
