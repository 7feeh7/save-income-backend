import { Express, Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc, { Options } from "swagger-jsdoc"
import { logger } from "@/shared/logger/logger"

const serverUrl = process.env.SWAGGER_SERVER_URL

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "save-income-backend",
      version: "1.0.0",
      description: "API para gestão de receitas e despesas",
    },
    servers: [{ url: serverUrl }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "src/presentation/http/controllers/**/*.ts",
    "src/presentation/http/routes/**/*.ts",
    "src/presentation/http/validators/**/*.ts",
  ],
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve as any, swaggerUi.setup(swaggerSpec) as any)

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
  })

  logger.info(`Docs available at ${serverUrl}/docs`)
}

export default swaggerDocs
