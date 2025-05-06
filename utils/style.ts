import { exec } from "ags/process";
import app from "ags/gtk4/app";
import Gio from "gi://Gio";
import GLib from "gi://GLib";

const DEFAULT_THEME = "catppuccin-macchiato";

async function tryLoadTheme(theme: string = DEFAULT_THEME): Promise<void> {
    const PWD = GLib.getenv("PWD") ?? ".";
    const fullPath = `${PWD}/style/themes/_${theme}.scss`;
    const file = Gio.File.new_for_path(fullPath);
    if (!file.query_exists(null)) {
        throw `File ${fullPath} does not exist.`;
    }

    exec(["ln", "-sf", fullPath, `${PWD}/style/themes/_theme-current.scss`]);
    exec(["sass", `${PWD}/style/main.scss`, "/tmp/ags-style.css"]);
    app.reset_css();
    app.apply_css("/tmp/ags-style.css");
}

export default {
    tryLoadTheme,
};
