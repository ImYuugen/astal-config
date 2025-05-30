import app from "ags/gtk4/app";
import Bar from "./widgets/bar/Bar.tsx";
import Styling from "./utils/style.ts";

function main() {
    // Self defined icons
    app.add_icons("./assets/icons/sketchy-app-svg");

    Styling.tryLoadTheme()
        .then(() => {
            app.get_monitors().map(Bar);
        })
        .catch(printerr);
}

function requestHandler(request: string, res: (response: any) => void) {
    // Theme requests are written as `ags request theme <your-theme>`
    // ./style/themes/_<your-theme>.scss must exist
    if (/^theme /.test(request)) {
        const theme = request.slice(request.search(" ") + 1);
        Styling.tryLoadTheme(theme)
            .then(() => {
                res("Loaded theme " + theme);
            })
            .catch(res);
    } else {
        res("Unknown request: " + request);
    }
}

app.start({
    requestHandler,
    main,
});
