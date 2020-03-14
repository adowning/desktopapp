import logger from 'parse-server/lib/logger'
import dotenv from 'dotenv'
const StackUtils = require('stack-utils')
const stack = new StackUtils({ cwd: process.cwd(), internals: StackUtils.nodeInternals() })
console.log(stack.clean(new Error().stack))
// console.log(new Error())

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' })
} else {
  dotenv.config({ path: '.env.prod' })
}
// eslint-disable-next-line import/first
import { App, InitClasses } from './app'

App.listen(process.env.PORT || 1337, async () => {
  await InitClasses()
  // await InitTests()
  // if (process.env.NODE_ENV === 'development') {
  //   await InitTests
  // }
  logger.info(`⚡️ Server listening on port ${process.env.PORT || 1337}!`)
})
