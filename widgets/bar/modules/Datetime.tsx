import GLib from "gi://GLib";
import { Poll } from "ags/state";

export default function DatetimeBarModule() {
    const time = new Poll(GLib.DateTime.new_now_local(), 1000, (_) =>
        GLib.DateTime.new_now_local(),
    );
    const dayKanji = ["", "月", "火", "水", "木", "金", "土", "日"];

    return (
        <box class="datetime-module bar-module">
            <label
                class="time"
                label={time((t) => t.format("%R") ?? "??:??")}
            />
            <label
                class="date"
                label={time((t) => t.format("%-m月%-d日") ?? "??/??")}
            />
            <label
                class="day-kanji"
                label={time((t) => `(${dayKanji[+(t.format("%u") ?? 0)]})`)}
            />
        </box>
    );
}
