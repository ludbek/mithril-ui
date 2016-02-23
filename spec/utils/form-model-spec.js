'use strict';

import FormModel from "../../utils/form-model.js";

describe("FormModel", function () {
  let formModel;
  let config = {
    username: {default: 'batman', presence: true},
    password: {}};
  beforeAll(() => {
    formModel = FormModel(config);
    });

  it("constructs an object", function () {
    expect(formModel).toBeDefined();
    });

  it("turns keys on config dict to the attributes of the returned object", function () {
    expect(formModel.username).toBeDefined();
    expect(formModel.password).toBeDefined();
    });

  it("attaches original config to ._config attribute of the object", function () {
    expect(formModel._config).toEqual(config);
    });

  it("sets default value to each attribute", function () {
    expect(formModel.username()).toEqual('batman');
    });

  it("sets empty .errors field", function () {
    expect(formModel.errors).toBeDefined();
    });

  it("sets .is_valid() method", function () {
    expect(formModel.is_valid).toBeDefined();
    });

  it("sets .is_dirty() method", function () {
    expect(formModel.is_dirty).toBeDefined();
    });

  describe(".aProp", function () {
    it("sets default value", function () {
      expect(formModel.username()).toEqual('batman');
      });

    it("is a getter and setter", function () {
      formModel.username('superman');
      expect(formModel.username()).toEqual('superman');
      });

    it("assigns errors on amodel.errors[aProp] field", function () {
      formModel.username("");
      expect(formModel.errors.username).toBeDefined();
      });

    it("assigns errors to .errors attribute of itself too", function () {
      expect(formModel.username.errors).toBeDefined();
      });

    it("updates its state/value even if validation fails", function () {
      formModel.username("");
      expect(formModel.username()).toEqual("");
      });

    it("empties the error field if valid value is supplied", function() {
      formModel.username('spiderman');
      expect(formModel.errors.username).not.toBeDefined();
      });

    it("validates against dependent field if equality is set", function () {
      let form = FormModel({
        password: {presence: true},
        confirmPassword: {equality: "password"}});

      form.password("flash");
      form.confirmPassword("quicksilver");
      expect(form.errors.confirmPassword).toBeDefined();

      form.confirmPassword("flash");
      expect(form.errors.confirmPassword).not.toBeDefined();
    });

    describe(".is_dirty()", function () {
      let aform = FormModel({username: {default: 'ausername', presence: true}});

      it("returns false if the value has not been altered", function () {
        expect(aform.username.is_dirty()).toEqual(false);
        });

      it("returns true if the value has been altered", function () {
        aform.username('busername');
        expect(aform.username.is_dirty()).toEqual(true);
        });
      });

    });

  describe(".is_valid()", function () {
    let aform = FormModel({username: {presence: true}});

    it("returns false if the form has not been altered", function () {
      expect(aform.is_valid()).toEqual(false);
      });

    it("returns true if form is valid", function () {
      aform.username("ausername");
      expect(aform.is_valid()).toEqual(true);
      });

    it("returns false if form is invalid", function () {
      aform.username("");
      expect(aform.is_valid()).toEqual(false);
      });

    });

  describe(".is_dirty()", function () {
    let aform = FormModel({username: {presence: true, default: 'ausername'}});

    it("returns false if form has not been altered", function () {
      expect(aform.is_dirty()).toEqual(false);
      });

    it("returns true if form has been altered", function () {
      aform.username('busername')
      expect(aform.is_dirty()).toEqual(true);
      });
    });

  describe(".validate()", function () {
    let aform;
    beforeAll(() => {
      aform = FormModel({username: {presence: true}});
      });

    it("populates .errors field if the form is invalid", function () {
      aform.validate();
      expect(aform.errors).toBeDefined();
      });

    if("sets the .errors field to undefined if form is valid", function () {
      aform.username('ausername');
      aform.validate();
      expect(aform.errors).not.toBeDefined();
      });
    });

  describe(".is_values", function () {
    let aform;
    beforeAll(() => {
      aform = FormModel(
        {username: {default: 'ausername'}, password: {default: 'apassword'}}
        );
      });

    it("returns the dict with key:value pair for each form field", function () {
      expect(aform.values()).toEqual({username: 'ausername', password: 'apassword'})
      });
    });

  });