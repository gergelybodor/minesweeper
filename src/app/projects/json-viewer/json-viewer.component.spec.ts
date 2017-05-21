import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonViewerComponent } from './json-viewer.component';
import { JsonObjectComponent } from './json-object/json-object.component';

describe('JsonViewerComponent', () => {
    let component: JsonViewerComponent;
    let fixture: ComponentFixture<JsonViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JsonViewerComponent, JsonObjectComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(JsonViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
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
