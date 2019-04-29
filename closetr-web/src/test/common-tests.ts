import { of } from 'rxjs';
import { clickTest, clickAndTestCalledWithMult } from './utils';

export const loggedUserRedirectDashboard = (
  service, component, fixture, router
) => {
  service.currentUserValue = of("fides");
  component.ngOnInit();
  fixture.detectChanges();
  expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
}

export const userNotRedirectDashboard = (router) => {
  expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
}

export const toggleEditModeShouldToggle = (
  component, fixture, button
) => {
  [1, 2, 3].forEach((i) => {
    clickTest(button, fixture);
    expect(component.toggleEditMode).toHaveBeenCalledTimes(i + 1);
    expect(component.editMode).toEqual(i % 2 === 0);
  });
}

export const editButtonTests = (
  component, fixture, hostElement
) => {
  let editButton;
  beforeEach(() => {
    editButton = hostElement.querySelector('#edit-button button');
    clickTest(editButton, fixture);
  });
  it(`should call toggleEditMode method, and
    change the editMode variable (multiple toggles)`, () => {
    toggleEditModeShouldToggle(component, fixture, editButton);
  });
  describe(`the save button`, () => {
    let saveButton;
    beforeEach(() => {
      saveButton = hostElement.querySelector('#save-button button');
    });
    it(`should hide save button when editMode is off`, () => {
      expect(saveButton.hidden).toBeFalsy();
      clickTest(editButton, fixture);
      expect(saveButton.hidden).toBeTruthy();
    });
    it(`should call save, and toggleEditMode functions
      when save button is clicked`, () => {
      clickAndTestCalledWithMult(
        saveButton,
        fixture,
        [{func: component.save}, {func: component.toggleEditMode}]
      );
    });
  });
}