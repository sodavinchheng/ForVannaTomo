<template>
	<v-app>
		<LoginBox />
	</v-app>
</template>

<script>
import LoginBox from '../components/LoginBox'
import BlankLayout from '../layouts/Blank'

export default {
	name: 'login',
	components: {
		LoginBox
	},
	created() {
		this.$emit('update: layout', BlankLayout)
	}
}
</script>
