PlayerEvents.tick(event => {

  let player = event.player
  let pstPlayer = PassiveSkillTreeJS.player(player)

  let hasBlacksmith = pstPlayer.hasSkill(classSkills['Blacksmith'])

  for (let skill in skillStages) {

    let stage = skillStages[skill]
    let unlocked = hasBlacksmith && pstPlayer.hasSkill(skill)

    if (unlocked) {
      if (!player.stages.has(stage)) {
        player.stages.add(stage)
      }
    } else {
      if (player.stages.has(stage)) {
        player.stages.remove(stage)
      }
    }
  }
})