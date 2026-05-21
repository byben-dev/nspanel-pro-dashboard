# NSPanel Pro Dashboard

A custom Lovelace card for the **Sonoff NSPanel Pro Gen2** — a 480×480 px fixed touchscreen panel mounted to the wall. Designed as a full-screen smart home dashboard with dedicated tabs for every room function.

> Built with Lit Element 3 · TypeScript · Vite

---

## Features

| Tab | What it shows |
|---|---|
| **Home** | Calendar (today's events), indoor temperature + heating threshold, light switches, robot vacuum, dishwasher, EV status bar |
| **Climate** | Thermostat — current temperature, target stepper, heat/off mode, live heating status |
| **Blinds** | Up to 8 covers with open/close/stop controls, position indicator, all-up/all-down scenes |
| **Media** | Album art, track info, progress bar, play/pause/skip |
| **Energy** | PV production, grid import/export, solar forecast, EV charge level + EVCC mode toggler |
| **Security** | Up to 4 live camera feeds, tap to fullscreen, portrait mode for doorbell cameras |
| **WiFi** | QR code for guest Wi-Fi — one tap to connect |

Additional features:
- **Doorbell popup** — full-screen camera overlay triggered by any binary sensor
- **Dark mode** — follows Home Assistant theme automatically
- **Customisable tab labels** — rename any tab
- **Ambient glow** — configurable accent colours behind cards

---

## Requirements

- Home Assistant **2024.1** or newer
- NSPanel Pro Gen2 (480×480 px display) — also works in any browser at that resolution
- The panel must open the dashboard as a **Lovelace view in kiosk/fullscreen mode**

---

## Installation

### Option A — Manual (recommended for now)

1. Copy `dist/nspanel-dashboard.js` to `/config/www/nspanel-dashboard.js` on your HA instance.

   Via SSH or the Portainer terminal:
   ```bash
   curl -o /config/www/nspanel-dashboard.js \
     "https://raw.githubusercontent.com/byben-dev/nspanel-pro-dashboard/main/dist/nspanel-dashboard.js"
   ```

2. In Home Assistant → **Settings → Dashboards → Resources**, add:
   ```
   URL:  /local/nspanel-dashboard.js
   Type: JavaScript module
   ```

3. Create a new Dashboard. Add a **Manual card** with:
   ```yaml
   type: custom:nspanel-dashboard
   pages:
     - home
     - climate
     - blinds
     - media
     - energy
     - security
   ```

4. Open the card editor to configure entities.

### Option B — HACS

> HACS submission pending. Coming soon.

---

## Configuration

All options are available through the visual card editor in HA. The YAML reference below is for advanced users.

### Pages

```yaml
pages:
  - home       # always include at least one
  - climate
  - blinds
  - media
  - energy
  - security
  - wifi
```

Custom tab labels (optional):
```yaml
home_label: Zuhause
energy_label: Solar
wifi_label: Gäste-WLAN
```

---

### Home Tab

```yaml
# Status bar
weather_entity: weather.home           # weather icon + temperature + condition
trash_entity: sensor.waste_collection  # next collection date

# Home page content
calendar_entity: calendar.family
indoor_temp_entity: sensor.living_room_temperature  # also powers heating stepper

# Presence (shown as 👨🏻 👩🏻 in status bar)
person_1: person.ben
person_2: person.evi

# Lights (up to 2, light or switch domain)
garden_light: light.garden
garden_light_icon: "🌿"   # optional emoji, default 💡
light_2: switch.terrace
light_2_icon: "🪴"

# Appliances
vacuum_entity: vacuum.roborock
dishwasher_entity: sensor.dishwasher_remaining_time  # sensor in minutes
```

**Trash category colours** — custom mapping (one rule per line):
```
paper,cardboard=🔴
yellow bag,plastic=🟡
residual,bio=⚫
glass=🟢
```

---

### Climate Tab

```yaml
thermostat_entity: climate.floor_heating
```

> The same entity also powers the **temperature card on the Home tab** — displaying the current room temperature and a +/− stepper to adjust the heating threshold. Configuring the thermostat here is enough for both.

The circle shows:
- Current temperature (large)
- **heizt…** (orange) when actively heating toward target
- **✓ erreicht** (green) when at target temperature

---

### Blinds Tab

```yaml
# Up to 8 covers
cover_1: cover.kitchen
cover_2: cover.living_room
cover_3: cover.bedroom
cover_4: cover.office
# cover_5 – cover_8 available via "More blinds" in editor

# All-up / all-down quick actions (scene or script)
scene_up: scene.all_blinds_up
scene_down: scene.all_blinds_down
```

---

### Media Tab

```yaml
media_player: media_player.beoplay_m5
```

The tab shows album art, title, artist, a real-time progress bar, and prev/play/next controls. When the player is off or unavailable a helpful hint is shown.

---

### Energy Tab

```yaml
# Live power (required for hero card)
pv_entity: sensor.solar_power          # W or kW
grid_entity: sensor.grid_power         # positive = import, negative = export

# Electric vehicle
ev_entity: sensor.ev_battery_soc       # state of charge in %
ev_range_entity: sensor.ev_range       # range in km
evcc_mode_entity: select.evcc_charge_mode  # EVCC select entity

# Daily totals & forecast (optional — shows forecast cards)
pv_today_entity: sensor.solar_energy_today      # kWh
forecast_today_entity: sensor.solar_forecast_today        # kWh
forecast_tomorrow_entity: sensor.solar_forecast_tomorrow  # kWh
```

**EVCC charge modes** — the button labels are read directly from the HA select entity options. If your EVCC integration uses `off / pv / minpv / now`, the dashboard maps these automatically to `Aus / Solar / Min+Solar / Schnell`.

The EV card (with mode toggler) is hidden automatically when the EV is not connected (unavailable state).

---

### Security Tab

```yaml
camera_1: camera.front_door
camera_2: camera.garage
camera_3: camera.backyard     # optional
camera_4: camera.side_gate    # optional

cameras_portrait: false   # set true for 9:16 vertical cameras
```

Tap any camera to open fullscreen. Tap again to close.

---

### Doorbell

```yaml
doorbell_trigger: binary_sensor.doorbell  # or input_boolean
doorbell_camera: camera.front_door        # optional — shown in popup
```

When `doorbell_trigger` flips to `on`, a full-screen camera popup appears on top of the current tab. Tap anywhere to dismiss.

---

### WiFi Tab

```yaml
wifi_ssid: MyGuestNetwork
wifi_password: supersecret123
wifi_security: WPA    # WPA (default) | WEP | nopass
```

The QR code is generated locally in the browser — no external service required. The password is hidden behind a `••••••••` mask with a reveal button.

---

### Appearance

```yaml
bg_accent_1: "#0A84FF"   # glow colour 1 (default: iOS Blue)
bg_accent_2: "#BF5AF2"   # glow colour 2 (default: iOS Purple)
```

Leave empty for defaults. The colours appear as a subtle ambient gradient behind the card surface.

---

## Full YAML example

```yaml
type: custom:nspanel-dashboard
pages:
  - home
  - climate
  - blinds
  - media
  - energy
  - security
  - wifi

# Home
weather_entity: weather.home
trash_entity: sensor.waste_collection
calendar_entity: calendar.family
indoor_temp_entity: sensor.living_room_temperature
person_1: person.ben
person_2: person.evi
garden_light: light.garden
garden_light_icon: "🌿"
light_2: switch.terrace
vacuum_entity: vacuum.roborock
dishwasher_entity: sensor.dishwasher_remaining_time

# Climate
thermostat_entity: climate.floor_heating

# Blinds
cover_1: cover.kitchen
cover_2: cover.living_room
cover_3: cover.bedroom
cover_4: cover.office
scene_up: scene.all_blinds_up
scene_down: scene.all_blinds_down

# Media
media_player: media_player.beoplay_m5

# Energy
pv_entity: sensor.solar_power
grid_entity: sensor.grid_power
ev_entity: sensor.evcc_vehicle_soc
ev_range_entity: sensor.evcc_vehicle_range
evcc_mode_entity: select.evcc_charge_mode
pv_today_entity: sensor.solar_energy_today
forecast_today_entity: sensor.solar_forecast_today
forecast_tomorrow_entity: sensor.solar_forecast_tomorrow

# Security
camera_1: camera.front_door
camera_2: camera.garage

# Doorbell
doorbell_trigger: binary_sensor.doorbell
doorbell_camera: camera.front_door

# WiFi
wifi_ssid: MyGuestNetwork
wifi_password: supersecret123

# Appearance
bg_accent_1: "#0A84FF"
bg_accent_2: "#BF5AF2"
```

---

## Tips

**Floor heating via generic_thermostat**
If you use a Shelly with a temperature sensor and a relay, create a `generic_thermostat` in HA:
```yaml
climate:
  - platform: generic_thermostat
    name: Floor Heating
    heater: switch.shelly_relay
    target_sensor: sensor.shelly_temperature
    min_temp: 15
    max_temp: 28
```
Use this as `thermostat_entity`.

**EV via EVCC**
Connect your vehicle through [EVCC](https://evcc.io). The relevant entities are typically:
- `sensor.evcc_vehicle_soc` — state of charge
- `sensor.evcc_vehicle_range` — estimated range
- `select.evcc_<wallbox>_mode` — charging mode

---

## Development

```bash
npm install
npm run dev     # dev server at localhost:5173
npm run build   # output → dist/nspanel-dashboard.js
```

The project uses **Vite** for bundling into a single JS file, which is what HA loads as a Lovelace resource.

---

## License

MIT — free to use, modify and distribute.
