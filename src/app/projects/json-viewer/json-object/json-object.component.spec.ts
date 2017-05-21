import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonViewerComponent } from '../json-viewer.component';
import { JsonObjectComponent } from './json-object.component';

describe('JsonObjectComponent', () => {
    let component: JsonObjectComponent;
    let fixture: ComponentFixture<JsonObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsonViewerComponent, JsonObjectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonObjectComponent);
        component = fixture.componentInstance;
        component.object = {};
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInput()', () => {

        it('should populate items array with object keys', () => {
            const expectedItems = ['key1', 'key2', 'key3', 'key4'];
            component.object = {
                key1: 'value1',
                key2: 'value1',
                key3: 'value1',
                key4: 'value1'
            };
            component.ngOnInit();
            expect(component.items).toEqual(expectedItems);
            expect(component.items.length).toBe(4);
        });

        it('should populate show array with false boolean values', () => {
            const expectedShow = [false, false, false, false];
            component.object = {
                key1: 'value1',
                key2: 'value1',
                key3: 'value1',
                key4: 'value1'
            };
            component.ngOnInit();
            expect(component.show).toEqual(expectedShow);
            expect(component.show.length).toBe(4);
        });
    });

    describe('isObject()', () => {

        it('should return true if parameter is of type object', () => {
            let mockParam = {};
            expect(component.isObject(mockParam)).toBeTruthy();
            mockParam = {key: 'value'};
            expect(component.isObject(mockParam)).toBeTruthy();

        });

        it('should return false if parameter is not of type object', () => {
            let mockParam = null;
            expect(component.isObject(mockParam)).toBeFalsy();
            mockParam = ['arr_item', 'arr_item'];
            expect(component.isObject(mockParam)).toBeFalsy();
            mockParam = 'string';
            expect(component.isObject(mockParam)).toBeFalsy();
            mockParam = 2;
            expect(component.isObject(mockParam)).toBeFalsy();
            mockParam = true;
            expect(component.isObject(mockParam)).toBeFalsy();
            mockParam = false;
            expect(component.isObject(mockParam)).toBeFalsy();
        });
    });

    describe('isArray()', () => {

        it('should return true if parameter is of type array', () => {
            const mockParam = ['arr_item', 'arr_item'];
            expect(component.isArray(mockParam)).toBeTruthy();
        });

        it('should return false if parameter is not of type array', () => {
            let mockParam = {};
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = {key: 'value'};
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = null;
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = 'string';
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = 2;
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = true;
            expect(component.isArray(mockParam)).toBeFalsy();
            mockParam = false;
            expect(component.isArray(mockParam)).toBeFalsy();
        });
    });

    describe('isNull()', () => {

        it('should return true if parameter is null', () => {
            const mockParam = null;
            expect(component.isNull(mockParam)).toBeTruthy();
        });

        it('should return false if parameter is not null', () => {
            let mockParam = {};
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = {key: 'value'};
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = ['arr_item', 'arr_item'];
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = 'string';
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = 2;
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = true;
            expect(component.isNull(mockParam)).toBeFalsy();
            mockParam = false;
            expect(component.isNull(mockParam)).toBeFalsy();
        });
    });

    describe('isNumber()', () => {

        it('should return true if parameter is of type number', () => {
            const mockParam = 2;
            expect(component.isNumber(mockParam)).toBeTruthy();
        });

        it('should return false if parameter is not of type number', () => {
            let mockParam = {};
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = {key: 'value'};
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = null;
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = ['arr_item', 'arr_item'];
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = 'string';
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = true;
            expect(component.isNumber(mockParam)).toBeFalsy();
            mockParam = false;
            expect(component.isNumber(mockParam)).toBeFalsy();
        });
    });

    describe('isString()', () => {

        it('should return true if parameter is of type string', () => {
            const mockParam = 'string';
            expect(component.isString(mockParam)).toBeTruthy();
        });

        it('should return false if parameter is not of type string', () => {
            let mockParam = {};
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = {key: 'value'};
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = null;
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = ['arr_item', 'arr_item'];
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = 2;
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = true;
            expect(component.isString(mockParam)).toBeFalsy();
            mockParam = false;
            expect(component.isString(mockParam)).toBeFalsy();
        });
    });

    describe('isBoolean()', () => {

        it('should return true if parameter is of type boolean', () => {
            let mockParam = true;
            expect(component.isBoolean(mockParam)).toBeTruthy();
            mockParam = false;
            expect(component.isBoolean(mockParam)).toBeTruthy();
        });

        it('should return false if parameter is not of type boolean', () => {
            let mockParam = {};
            expect(component.isBoolean(mockParam)).toBeFalsy();
            mockParam = {key: 'value'};
            expect(component.isBoolean(mockParam)).toBeFalsy();
            mockParam = null;
            expect(component.isBoolean(mockParam)).toBeFalsy();
            mockParam = ['arr_item', 'arr_item'];
            expect(component.isBoolean(mockParam)).toBeFalsy();
            mockParam = 2;
            expect(component.isBoolean(mockParam)).toBeFalsy();
            mockParam = 'string';
            expect(component.isBoolean(mockParam)).toBeFalsy();
        });
    });

    describe('isObjectOrArray()', () => {

        it('should return true if isObject returns true', () => {
            const isObject = spyOn(component, 'isObject').and.returnValue(true);
            const mockParam = 'mockParam';
            expect(component.isObjectOrArray(mockParam)).toBeTruthy();
            expect(isObject).toHaveBeenCalled();
            expect(isObject).toHaveBeenCalledWith(mockParam);
            expect(component.isObject(mockParam)).toBeTruthy();
        });

        it('should return true if isArray returns true', () => {
            const isArray = spyOn(component, 'isArray').and.returnValue(true);
            const mockParam = 'mockParam';
            expect(component.isObjectOrArray(mockParam)).toBeTruthy();
            expect(isArray).toHaveBeenCalled();
            expect(isArray).toHaveBeenCalledWith(mockParam);
            expect(component.isArray(mockParam)).toBeTruthy();
        });

        it('should return false if neither isObject nor isArray returns true', () => {
            const isObject = spyOn(component, 'isObject').and.returnValue(false);
            const isArray = spyOn(component, 'isArray').and.returnValue(false);
            const mockParam = 'mockParam';
            expect(component.isObjectOrArray(mockParam)).toBeFalsy();
            expect(isObject).toHaveBeenCalled();
            expect(isObject).toHaveBeenCalledWith(mockParam);
            expect(component.isObject(mockParam)).toBeFalsy();
            expect(isArray).toHaveBeenCalled();
            expect(isArray).toHaveBeenCalledWith(mockParam);
            expect(component.isArray(mockParam)).toBeFalsy();
        });
    });

    describe('toggleShow()', () => {

        it('should toggle value of item at position index in show array', () => {
            component.show = [true, false, false];
            expect(component.show[0]).toBe(true);
            expect(component.show[1]).toBe(false);
            expect(component.show[2]).toBe(false);
            component.toggleShow(0);
            expect(component.show[0]).toBe(false);
            component.toggleShow(0);
            expect(component.show[0]).toBe(true);
            component.toggleShow(1);
            expect(component.show[1]).toBe(true);
            component.toggleShow(1);
            expect(component.show[1]).toBe(false);
        });
    });
});
