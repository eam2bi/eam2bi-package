'use babel';

import Eam2biPackage from '../lib/eam2bi-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Eam2biPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('eam2bi-package');
  });

  describe('when the eam2bi-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.eam2bi-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'eam2bi-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.eam2bi-package')).toExist();

        let eam2biPackageElement = workspaceElement.querySelector('.eam2bi-package');
        expect(eam2biPackageElement).toExist();

        let eam2biPackagePanel = atom.workspace.panelForItem(eam2biPackageElement);
        expect(eam2biPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'eam2bi-package:toggle');
        expect(eam2biPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.eam2bi-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'eam2bi-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let eam2biPackageElement = workspaceElement.querySelector('.eam2bi-package');
        expect(eam2biPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'eam2bi-package:toggle');
        expect(eam2biPackageElement).not.toBeVisible();
      });
    });
  });
});
