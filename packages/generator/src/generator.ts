import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { genClass } from './helpers/genClass'
import { writeFileSafely } from './utils/writeFileSafely'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../generated',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    // generate crud clasess
    options.dmmf.datamodel.models.forEach(async (model) => {
      const crudClass = genClass(model.name)
      await writeFileSafely(
        path.join(options.generator.output?.value!, `${model.name}Crud.ts`),
        crudClass,
      )
    })
  },
})
