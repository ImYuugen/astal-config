/// @file Battery.tsx
/// @namespace Battery
/// Module for showing battery information and managing power profiles
/// in the status bar.
/// Looks like this: <battery-icon><percentage>

import AstalBattery from "gi://AstalBattery";
import { bind } from "ags/state";

export default function () {
    const battery = AstalBattery.get_default();

    const percentage = bind(battery, "percentage");

    return (
        <box
            class="battery-module bar-module"
            visible={bind(battery, "is_present")}
        >
            <image iconName={bind(battery, "battery_icon_name")} />
            <label
                class="percentage"
                label={percentage.as((p) => `${Math.floor(p * 100)}%`)}
            />
        </box>
    );
}
