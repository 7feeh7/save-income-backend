import { app } from "./app"
import swaggerDocs from "./presentation/http/docs/swagger"
import { logger } from "./shared/logger/logger"

export const PORT = process.env.PORT || 3333

app.listen(PORT, async () => {
  logger.info(`Server running on port: ${PORT}`)
  swaggerDocs(app, Number(PORT))
})
