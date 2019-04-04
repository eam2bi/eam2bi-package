'use babel';

import Eam2biPackageView from './eam2bi-package-view';
import { CompositeDisposable } from 'atom';

export default {

  eam2biPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.eam2biPackageView = new Eam2biPackageView(state.eam2biPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.eam2biPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eam2bi-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.eam2biPackageView.destroy();
  },

  serialize() {
    return {
      eam2biPackageViewState: this.eam2biPackageView.serialize()
    };
  },

  toggle() {
    console.log('Eam2biPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
