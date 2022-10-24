import controller from "./controller.js";
import remote from "../../../storage/remote.js";
import config from "../../../config/index.js";

export default controller(remote(config.mysql_service.HOST_NAME, config.mysql_service.PORT));