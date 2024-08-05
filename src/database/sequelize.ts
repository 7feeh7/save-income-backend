import { Sequelize } from "sequelize"
import { development } from "./config"

const sequelize = new Sequelize(development)

export { sequelize }
