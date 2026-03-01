ServerEvents.recipes(event => {
	event.remove({ output: 'coinsje:copper_coin', type: 'minecraft:blasting' }),
	event.remove({ output: 'coinsje:copper_coin', type: 'minecraft:smelting' }),
	event.remove({ output: 'coinsje:iron_coin', type: 'minecraft:blasting' }),
	event.remove({ output: 'coinsje:iron_coin', type: 'minecraft:smelting' }),
	event.remove({ output: 'coinsje:gold_coin', type: 'minecraft:blasting' }),
	event.remove({ output: 'coinsje:gold_coin', type: 'minecraft:smelting' }),
	event.remove({ output: 'coinsje:diamond_coin', type: 'minecraft:blasting' }),
	event.remove({ output: 'coinsje:diamond_coin', type: 'minecraft:smelting' }),
	event.remove({ output: 'coinsje:netherite_coin', type: 'minecraft:blasting' }),
	event.remove({ output: 'coinsje:netherite_coin', type: 'minecraft:smelting' })
})