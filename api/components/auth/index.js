import ctrl from "./controller.js";
import remote from "../../../storage/remote.js";
import config from "../../../config/index.js";

export default ctrl(remote('localhost', config.mysql_service.PORT)); 