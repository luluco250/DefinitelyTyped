// Type definitions for leaflet-toolbar 0.4
// Project: https://github.com/Leaflet/Leaflet.toolbar#readme
// Definitions by: Lucas Melo <https://github.com/luluco250>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as L from 'leaflet';

declare module 'leaflet' {
    interface ToolbarOptions extends L.LayerOptions {
        filter?(): boolean | undefined;
        actions?: (new (map: L.Map) => Toolbar2.Action)[] | undefined;
    }

    class Toolbar2 extends L.Layer {
        options: ToolbarOptions;
        constructor(options?: ToolbarOptions | undefined);
        initialize(options?: ToolbarOptions | undefined): void;
    }

    namespace Toolbar2 {
        interface ActionOptions {
            toolbarIcon?:
                | {
                      html?: string | undefined;
                      className?: string | undefined;
                      tooltip?: string | undefined;
                  }
                | undefined;
            subToolbar?: Toolbar2 | undefined;
        }

        class Action extends L.Handler {
            options: ActionOptions;
            enable(event?: Event | undefined): this;
            initialize(options?: ActionOptions | undefined): void;
        }

        namespace Action {
            function extendOptions<
                TOptions extends ActionOptions & Record<string, unknown>,
                TAction extends Action & { options: Partial<TOptions> },
            >(options?: TOptions | undefined): new (map: L.Map) => TAction;
        }

        class Control extends Toolbar2 {}

        interface PopupOptions extends ToolbarOptions {
            anchor?: L.LatLngExpression | undefined;
        }

        class Popup extends Toolbar2 {
            options: PopupOptions;
            constructor(options?: PopupOptions | undefined);
            // @ts-expect-error
            initialize(latlng: L.LatLngExpression, options?: PopupOptions | undefined): void;
            setLatLng(latlng: L.LatLngExpression): this;
        }
    }

    namespace Control {
        class Toolbar extends L.Control {}
    }

    namespace toolbar {
        /** @deprecated Use {@link Toolbar2.Control} */
        function control(options?: ControlOptions | undefined): Toolbar2.Control;
        /** @deprecated Use {@link Toolbar2.Popup} */
        function popup(options?: PopupOptions | undefined): Toolbar2.Popup;
    }

    /** @deprecated Use {@link Toolbar2.Action} */
    function toolbarAction(options?: Toolbar2.ActionOptions | undefined): Toolbar2.Action;
}
