import { Astal, Gdk } from "ags/gtk4";
import DatetimeBarModule from "./modules/Datetime";
import app from "ags/gtk4/app";

function BarLeft() {
    return <box class="box-left"></box>;
}

function BarCenter() {
    return (
        <box class="box-center">
            <DatetimeBarModule />
        </box>
    );
}

function BarRight() {
    return <box class="box-right"></box>;
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            visible
            name="bar-top"
            class="bar-top"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >
            <centerbox class="main-centerbox">
                <BarLeft _type="start" />
                <BarCenter _type="center" />
                <BarRight _type="end" />
            </centerbox>
        </window>
    );
}
