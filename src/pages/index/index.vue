<template>
	<div>
		{{ msg }}

		<div 
			class="box" 
			@click="alertHandle"
		>
			点击弹出时间
		</div>
	</div>
</template>

<script>
import utils from '@/utils'
export default {
	data(){
		return {
			msg: 'This is home'
		}
	},
	methods: {
		alertHandle(){
			// alert('vue dev')
			alert(utils.getTime());
		}
	}
}
</script>
<style lang="scss">
	.box{

		width: 300px;
		height: 300px;
		background: url('../../assets/101E9583-EA0A-4866-842F-D86FB857D7D0.png')
	}
</style>
