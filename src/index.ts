import { Plugin, PluginEvents, PluginType } from "@serenityjs/plugins";
import { BackgroundTask } from "./task/background-task";

class ClearLagPlugin extends Plugin implements PluginEvents {
  public readonly type = PluginType.Addon;

  public constructor() {
    super("clearlag", "1.0.0");
  }

  public onInitialize(): void {
    this.logger.info("ClearLag initialized!");

    new BackgroundTask(this);
  }

  public onStartUp(): void {
    this.logger.info("ClearLag started up!");
  }

  public onShutDown(): void {
    this.logger.info("ClearLag shut down!");
  }
}

export { ClearLagPlugin };

export default new ClearLagPlugin();
