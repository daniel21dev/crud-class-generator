# class-crud-generator

## Install

`npm i crud-class-generator`

## Usage

In _schema.prisma_

    generator crud {
      provider = "crud-class-generator"
      output   = "./crud-classes"
    }

In your code

    export class PostsService extends PostCrud {
      constructor(prismaService: PrismaService) {
        super(prismaService);
      }
    }

    const posts = await postsSerrvice.find({});
