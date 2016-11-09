import m from "mithril";
import {field} from "./field.js";
import component from "mithril-componentx";
import {required} from "validatex";


export const checkbox = component({
	name: "checkbox",
	base: field,
	attrSchema: {
		model: required(true),
		label: required(true)
	},
	toggleState (attrs) {
		attrs.model.setAndValidate(!attrs.model());
	},
	getLabelAppend (attrs) {
		if(attrs.help && !attrs.model.errors()) {
			return m('label.help', attrs.help);
		}
		else if(attrs.model.error() && !attrs.hideError) {
			return m('label.error', attrs.model.error());
		}
		return null;
	},
  view (vnode) {
		let attrs = vnode.attrs;
		attrs.rootAttrs.onclick = this.toggleState.bind(this, attrs);

    return m('div', attrs.rootAttrs,
             m(".ui.checkbox", {className: attrs.model()? "checked": ""},
               m("input.hidden[type=checkbox][tabindex=0]", {checked: attrs.model()}),
               m("label", attrs.label)),
             this.getLabelAppend(attrs));
  }
});