import { Variable, GLib } from "astal";

export default function DatetimeBarModule() {
    const time = Variable(GLib.DateTime.new_now_local()).poll(1000, () =>
        GLib.DateTime.new_now_local(),
    );
    const dayKanji = ["", "月", "火", "水", "木", "金", "土", "日"];

    return (
        <box className="datetime-module">
            <label
                className="day-kanji"
                label={time((t) => dayKanji[+(t.format("%u") ?? 0)])}
            />
            <box className="date-time">
                <label
                    className="time"
                    label={time((t) => t.format("%R") ?? "??:??")}
                />
                <label
                    className="date"
                    label={time((t) => t.format("%d/%m") ?? "??/??")}
                />
            </box>
        </box>
    );
}
