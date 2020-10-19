const handleAgentSelection = (e,subStrings) => {
    var result = []
    subStrings.map(agent => {
      var name = agent.substrings.slice(-1).pop()
      agent.substrings.map(sub => {
        if (e === sub) {
          const check = result.filter(e => e.agentId === agent.id)
          if(check.length === 0){
            result.push({
              agentId: agent.id,
              name: name
            })
          }
        }
      })
    })
    return result
}

export {
  handleAgentSelection
}
