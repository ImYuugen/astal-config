import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widgets/bar/Bar.tsx";

function main() {
    App.get_monitors().map(Bar);
}

App.start({
    css: style,
    main,
});
