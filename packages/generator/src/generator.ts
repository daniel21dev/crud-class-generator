import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { genClass } from './helpers/genClass'
import { genEnum } from './helpers/genEnum'
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
    // generates enums
    options.dmmf.datamodel.enums.forEach(async (enumInfo) => {
      const tsEnum = genEnum(enumInfo)
      const writeLocation = path.join(
        options.generator.output?.value!,
        `${enumInfo.name}.ts`,
      )
      await writeFileSafely(writeLocation, tsEnum)
    })
    // generate crud clasess
    //const models = options.dmmf.schema.inputObjectTypes.prisma

    options.dmmf.datamodel.models.forEach(async (model) => {
      const crudClass = genClass(model.name)
      await writeFileSafely(
        path.join(options.generator.output?.value!, `${model.name}Crud.ts`),
        crudClass,
      )
    })

    /*
    const inputs = options.dmmf.schema.inputObjectTypes.prisma
      .map((x) => JSON.stringify(x.name))
      .join(', ')
    const out = `const models = [${models}];
      const inputs = [${inputs}]`*/
  },
})
