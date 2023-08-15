import * as L from 'leaflet';
import 'leaflet-toolbar';

const map = new L.Map('');

class MyAction extends L.Toolbar2.Action {
    enable(event?: Event | undefined): this {
        return this;
    }
    disable(): this {
        return this;
    }
    enabled(): boolean {
        return true;
    }
    initialize(options?: L.Toolbar2.ActionOptions | undefined): void {}
    extendOptions(options?: L.Toolbar2.ActionOptions | undefined): this {
        return this;
    }
    addHooks(): void {}
    removeHooks(): void {}
}

const ExtendedAction = MyAction.extendOptions({ foo: 2 });
const ext = new ExtendedAction(map);
ext.options.foo = 3;
ext.options.toolbarIcon = {
    className: '',
    html: '',
    tooltip: '',
};

const baseToolbar = new L.Toolbar2();
baseToolbar.options = {
    actions: [MyAction, ExtendedAction],
    filter() {
        return true;
    },
};

const controlToolbar = new L.Toolbar2.Control();
controlToolbar.initialize(baseToolbar.options);

const popupToolbar = new L.Toolbar2.Popup();
popupToolbar.initialize([2, 3], {
    anchor: [4, 5],
    attribution: '',
    actions: [MyAction, ExtendedAction],
    pane: '',
    filter() {
        return false;
    },
});
