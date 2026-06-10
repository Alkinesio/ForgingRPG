const blacksmithBlocks = {
  'skilltree:utility_10': ['minecraft:anvil', 'minecraft:chipped_anvil', 'minecraft:damaged_anvil', 'goety:dark_anvil', 'goety:chipped_dark_anvil', 'goety:damaged_dark_anvil', 'irons_spellbooks:arcane_anvil', 'cataclysm:mechanical_fusion_anvil', 'sophisticatedbackpacks:anvil_upgrade'],
  'skilltree:utility_12': ['skilltree:workbench'],
  'skilltree:utility_14': ['apotheosis:simple_reforging_table', 'apotheosis:reforging_table', 'ze_apotheosis:artisanal_reforging_table', 'ze_apotheosis:enhanced_reforging_table', 'ze_apotheosis:ultimate_reforging_table', 'ze_apotheosis:god_reforging_table'],
  'skilltree:utility_19': ['apotheosis:salvaging_table'],
  'skilltree:utility_21': ['minecraft:smithing_table']
}

BlockEvents.rightClicked(event => {
  let player = event.player
  let blockId = event.block.id

  let pstPlayer = PassiveSkillTreeJS.player(player)

  // --- check if player has ANY class ---
  let hasAnyClass = false
  let playerBaseSkill = null

  for (let className in classSkills) {
    let baseSkill = classSkills[className]
    if (pstPlayer.hasSkill(baseSkill)) {
      hasAnyClass = true
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