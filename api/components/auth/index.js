import ctrl from "./controller.js";
import remote from "../../../storage/remote.js";
import config from "../../../config/index.js";

export default ctrl(remote(config.mysql_service.HOST_NAME, config.mysql_service.PORT)); 