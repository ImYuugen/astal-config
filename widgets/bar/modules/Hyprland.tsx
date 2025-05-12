/// @file Hyprland.tsx
/// @namespace Hyprland
/// Module for showing hyprland information in the status bar such as
/// active workspaces, active applications, current workspace, submap...
/// A workspace is shown as a group of app icons with a number to the left,
/// the current workspace has a different background and only keeps the number

import AstalHyprland from "gi://AstalHyprland";
import { bind } from "ags/state";
import { For } from "ags/gtk4";

// TODO: Get apps symbolic svg's and show them

function workspaceApps(ws: AstalHyprland.Workspace) {
    return <box>{ws?.id}</box>;
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
                            {workspaceApps(ws)}
                        </button>
                    );
                }}
            </For>
        </box>
    );
}
