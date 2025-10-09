import { Sequelize } from "sequelize"
import { development } from "./config.js"

const sequelize = new Sequelize(development)

export { sequelize }
