<template>
	<div class="detail-container" v-bind:style="checkPosition">
		<div class="defi-type">{{definition.type}}</div>
	</div>
</template>

<script>
    export default {
        name: "Detail",
				props: {
					definition: {
						type: Object,
						default: null
					},
					position: {
						type: Object,
						default: function() {
							return {
								x: '500',
								y: '200'
							}
            }
					}
				},
				data() {
					return {
						checkPosition: {
							left: this.position.x + 'px',
							top: this.position.y + 'px',
						}
					}
				}
    }
</script>

<style scoped>
	.detail-container {
		position: absolute;
		z-index: 999;
		height: 400px;
		width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #ffffff;
		border-radius: 10px;
	}

</style>