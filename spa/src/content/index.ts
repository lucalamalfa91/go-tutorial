import introduction from './modules/01-introduction.md?raw'
import setup from './modules/02-setup.md?raw'
import helloWorld from './modules/03-hello-world.md?raw'
import basicSyntax from './modules/04-basic-syntax.md?raw'
import dataStructures from './modules/05-data-structures.md?raw'
import idiomaticGo from './modules/06-idiomatic-go.md?raw'
import firstApp from './modules/07-first-app.md?raw'
import nextSteps from './modules/08-next-steps.md?raw'

export const markdownModules: Record<string, string> = {
  '01-introduction.md': introduction,
  '02-setup.md': setup,
  '03-hello-world.md': helloWorld,
  '04-basic-syntax.md': basicSyntax,
  '05-data-structures.md': dataStructures,
  '06-idiomatic-go.md': idiomaticGo,
  '07-first-app.md': firstApp,
  '08-next-steps.md': nextSteps,
}
