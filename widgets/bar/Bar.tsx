import { Astal, Gdk } from "astal/gtk3";

function BarLeft() {
    return <box className="box-left"></box>;
}

function BarCenter() {
    return <box className="box-center"></box>;
}

function BarRight() {
    return <box className="box-right"></box>;
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            className="top-bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
        >
            <centerbox className="main-centerbox">
                <BarLeft />
                <BarCenter />
                <BarRight />
            </centerbox>
        </window>
    );
}
