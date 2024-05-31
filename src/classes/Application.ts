import { version } from "../../package.json";

class Application {
  static get version(): string {
    return version;
  }
}

export { Application };
