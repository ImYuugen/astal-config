/** @file icons.ts
 * @author Yuugen <yuugenssb@proton.me>
 * Icon related functions
 */

/**
 * Try to simplify a complex WM class name into a shorter, more generic one.
 * This is based on its class name alone, so it's not exact.
 * Only useful if toSketchyLigature does not find an appropriate icon.
 * @param {string} class_name The client's class name as specified in the WM
 * @returns {string} The simplified class name
 * @example
 * ```js
 * simplifyWindowClass("firefox-nightly") // firefox
 * simplifyWindowClass("org.wezfurlong.wezterm") // terminal
 * simplifyWindowClass("kitty") // terminal
 * ```
 */
export function simplifyWindowClass(class_name: string): string {
    const lower_class_name = class_name.toLocaleLowerCase();
    // TODO: Add stuff here
    return "";
}

/**
 * Convert a window class name into its corresponding SketchyBar icon ligature.
 * @see https://github.com/kvndrsslr/sketchybar-app-font
 * @param {string} class_name The window class name
 * @returns {string} A text corresponding to the ligature
 * @example
 * ```js
 * toSketchyLigature("org.wezfurlong.wezterm") // :wezterm:
 * toSketchyLigature("firefox-nightly") // :firefox:
 * ```
 */
export function toSketchyLigature(class_name: string): string {
    const lower_class_name = class_name.toLocaleLowerCase();
    const candidates_common = [
        "davinci",
        "discord",
        "emacs",
        "firefox",
        "mpv",
        "obsproject",
        "parsec",
        "slack",
        "spotify",
        "steam",
        "thunderbird",
        "vlc",
        "wezterm",
    ];
    for (const c of candidates_common) {
        const reg = new RegExp(String.raw`${c}`);
        if (reg.test(lower_class_name)) {
            return `:${c}:`;
        }
    }
    if (/(discord|legcord|vesktop)/.test(lower_class_name)) {
        return ":discord:";
    }
    return ":default:";
}
