let classSkills = {
  'Blacksmith': 'skilltree:utility_2'
}

let blacksmithBlocks = {
  'skilltree:utility_10': ['minecraft:anvil'],
  'skilltree:utility_12': ['skilltree:workbench'],
  'skilltree:utility_14': ['apotheosis:reforging_table'],
  'skilltree:utility_19': ['apotheosis:salvaging_table'],
  'skilltree:utility_21': ['minecraft:smithing_table']
}

BlockEvents.rightClicked(event => {
  let player = event.player
  let blockId = event.block.id

  let pstPlayer = PassiveSkillTreeJS.player(player)

  // --- check if player has ANY class ---
  let hasAnyClass = false
  let playerClassName = null
  let playerBaseSkill = null

  for (let className in classSkills) {
    let baseSkill = classSkills[className]
    if (pstPlayer.hasSkill(baseSkill)) {
      hasAnyClass = true
      playerClassName = className
      playerBaseSkill = baseSkill
      break
    }
  }

  // --- check block requirements ---
  for (let skill in blacksmithBlocks) {
    let allowedBlocks = blacksmithBlocks[skill]

    if (allowedBlocks.includes(blockId)) {

      // ❌ no class at all
      if (!hasAnyClass) {
        player.tell(Text.of("Unlock Blacksmith support class before using this block!").red())
        event.cancel()
        return
      }

      // ❌ has class but not correct one (future-proof if you add more classes)
      if (playerBaseSkill !== classSkills['Blacksmith']) {
        player.tell(Text.of("Only Blacksmiths can use this block!").red())
        event.cancel()
        return
      }

      // ❌ missing specific skill tier
      if (!pstPlayer.hasSkill(skill)) {
        player.tell(Text.of("Unlock required utility skill before using this block!").red())
        event.cancel()
        return
      }

      // ✅ allowed
      return
    }
  }
})