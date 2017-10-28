import notesStore from './notesStore.js'
import stateStore from './stateStore.js'
import templatesStore from './templateStore.js'

const model = {
  notes: notesStore,
  state: stateStore,
  templates: templatesStore
}

export default model
