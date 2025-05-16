/// @file Hyprland.tsx
/// @namespace Hyprland
/// Module for showing hyprland information in the status bar such as
/// active workspaces, active applications, current workspace, submap...
/// A workspace is shown as a group of app icons with a number to the left,
/// the current workspace has a different background and only keeps the number

import AstalHyprland from "gi://AstalHyprland";
import { bind } from "ags/state";
import { For, Gtk } from "ags/gtk4";
import { simplifyWindowClass, toSketchyLigature } from "../../../utils/icons";

const gtk_theme = new Gtk.IconTheme();

function workspaceApps(ws: AstalHyprland.Workspace) {
    // Overlay with faded apps behind and number in foreground
    return (
        <box class="workspace-apps">
            <For each={bind(ws, "clients")}>
                {(client) => {
                    // Try to find a corresponding svg
                    const sketchy_icon = toSketchyLigature(client.class);
                    if (sketchy_icon !== ":default:") {
                        return (
                            <image
                                class="sketchy-app-icon app-icon"
                                iconName={sketchy_icon}
                            />
                        );
                    }
                    // Check if a GTK icon exists
                    if (gtk_theme.has_icon(client.class)) {
                        return (
                            <image
                                class="gtk-app-icon app-icon"
                                iconName={client.class}
                            />
                        );
                    }
                    const simplified_class = simplifyWindowClass(client.class);
                    if (gtk_theme.has_icon(simplified_class)) {
                        return (
                            <image
                                class="gtk-app-icon app-icon"
                                iconName={simplified_class}
                            />
                        );
                    }
                    // Default
                    return (
                        <image
                            class="sketchy-app-icon app-icon"
                            iconName={sketchy_icon}
                        />
                    );
                }}
            </For>
        </box>
    );
}

export default function HyprlandBarModule() {
    const hypr = AstalHyprland.get_default();

    const workspaces = bind(hypr, "workspaces");
    const focused = bind(hypr, "focusedWorkspace");

    return (
        <box class="workspaces-module bar-module">
            <For
                each={workspaces.as((wss) =>
                    wss.sort((ws1, ws2) => ws1.id - ws2.id),
                )}
            >
                {(ws) => {
                    return (
                        <button
                            class={focused.as(
                                (fw) =>
                                    (ws.id === fw?.id ? "focused" : "") +
                                    " workspace-btn",
                            )}
                            $clicked={() => ws.focus()}
                        >
                            <box class="workspace">
                                <label
                                    class="workspace-id"
                                    label={`${ws.id}`}
                                />
                                {workspaceApps(ws)}
                            </box>
                        </button>
                    );
                }}
            </For>
        </box>
    );
}
