# ClearLag

A powerful and efficient plugin for **SerenityJS** designed to reduce server lag by intelligently managing and clearing ground items and other entities. Keep your server running smoothly without impacting gameplay.

## Features

* **Automatic Entity Clearing:** Automatically clears dropped items and other configured entities at a set interval to prevent accumulation and reduce lag.
* **Manual Clearing:** Provides commands for administrators to manually clear entities when needed.
* **Highly Configurable:** Easily customize clearing intervals and warning messages.
* **Warning Broadcasts:** Notifies players with configurable messages before a clear occurs, so they have time to pick up important items.
* **Lightweight:** Designed to be efficient and have a minimal performance impact on your server.

## Configuration

You can configure the plugin by editing the `config.json` (or relevant file) located in your plugin's data folder.

```json
{
  "auto-clear-interval": 120000,
  "announce-message": "Clearing entities in {time}!",
  "message": {
    "seconds": "second(s)",
    "minute": "minute(s)",
    "cleared": {
      "item": "Cleared {count} items",
      "entity": "Cleared {count} entities"
    }
  },
  "blacklisted-worlds": [
    "world",
    "world-2"
  ]
}
```

* **`auto-clear-interval`**: The time in milliseconds between each automatic clear (120000ms = 2 minutes).
* **`announce-message`**: The message broadcast to the server before a clear. The `{time}` placeholder will be replaced with the remaining time.
* **`message`**: The messages sent after the clear is complete. Placeholders like `{entities}` and `{items}` will be replaced with the actual numbers.
* **`blacklisted-worlds`**: A list of worlds where entities will **not** be cleared.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
