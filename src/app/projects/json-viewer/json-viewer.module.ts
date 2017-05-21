import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonViewerRoutingModule } from './json-viewer-routing.module';

import { JsonViewerComponent } from './json-viewer.component';
import { JsonObjectComponent } from './json-object/json-object.component';

@NgModule({
    imports: [
        CommonModule,
        JsonViewerRoutingModule
    ],
    declarations: [JsonViewerComponent, JsonObjectComponent]
})
export class JsonViewerModule {
}
