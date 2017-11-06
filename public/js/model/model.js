import notesStore from './stores/notesStore.js'
import stateStore from './stores/stateStore.js'
import templatesStore from './router/templateStore.js'

const model = {
  notes: notesStore,
  state: stateStore,
  templates: templatesStore
}

export default model
