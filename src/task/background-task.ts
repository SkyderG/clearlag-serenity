import { EntityItemStackTrait } from "@serenityjs/core";
import { ClearLagPlugin } from "..";
import config from "../../config.json";

class BackgroundTask {
  private plugin: ClearLagPlugin;

  public constructor (plugin: ClearLagPlugin) {
    this.plugin = plugin;

    this.runInterval();
  }

  public runInterval(): void {
    const clearIntervalMS = config["auto-clear-interval"];

    let autoClearInterval = config["auto-clear-interval"];
    const interval = setInterval(() => {
      autoClearInterval -= 1000;

      const remainingMin = Math.floor(autoClearInterval / 60000);

      const worlds = this.plugin.serenity.worlds;

      worlds.forEach((world) => {
        if (config["blacklisted-worlds"].includes(world.identifier)) return;

        if (remainingMin > 0 && remainingMin % 60000 === 0) {
          world.sendMessage(
            config["announce-message"].replace(
              "{time}",
              `${remainingMin} minutes`
            )!
          );
        }

        if (autoClearInterval <= 5000 && autoClearInterval > 0) {
          const seconds = autoClearInterval / 1000;

          world.sendMessage(
            config["announce-message"].replace("{time}", `${seconds} seconds`)!
          );
        }

        if (autoClearInterval <= 0) {
          clearInterval(interval);
          this.onRun();
        }
      });
    }, 1000);

    setInterval(() => {
      autoClearInterval = config["auto-clear-interval"];
      this.onRun();
    }, clearIntervalMS);
  }

  public onRun(): void {
    const worlds = this.plugin.serenity.worlds;

    let entityCount = 0;
    let itemCount = 0;

    worlds.forEach((world) => {
      if (config["blacklisted-worlds"].includes(world.identifier)) return;

      const entities = world.getEntities();

      const entityFilter = entities.filter((entity) => !entity.isPlayer());

      if (entityFilter.length === 0) return;

      for (const entity of entityFilter) {
        if (entity.isItem()) {
          itemCount += entity.getTrait(EntityItemStackTrait).itemStack.amount;
        } else {
          entityCount++;
        }
        
        entity.despawn();
      }

      const clearEntitiesMessage = config.message[0]?.replace(
        "{entities}",
        entityCount.toString()
      ) as string;

      const clearItemsMessage = config.message[1]?.replace(
        "{items}",
        itemCount.toString()
      ) as string;

      world.sendMessage(clearEntitiesMessage!);
      world.sendMessage(clearItemsMessage!);
    })
  }
}

export { BackgroundTask };