import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { and, createAjv, isControl, optionIs, rankWith, schemaTypeIs, scopeEndsWith, Tester } from '@jsonforms/core';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import uischemaAsset from '../assets/uischema.json';
import schemaAsset from '../assets/schema.json';
import dataAsset from './data';
import { DateAdapter } from '@angular/material/core';
import {HttpClient} from "@angular/common/http";
import { forkJoin } from 'rxjs';
import Ajv from 'ajv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  renderers = angularMaterialRenderers;
  uischema:object;
  schema:object;
  data = {};
  i18n = {locale: 'de-DE'}
  dateAdapter: DateAdapter<Date>;
  ajv:Ajv;
  
  constructor(dateAdapter: DateAdapter<Date>, http:HttpClient) {

    const options = {
      headers: {
        'Content-Type': 'application/json',
      }
    };

    var url = 'https://localhost:7055'; 

    forkJoin([http.get<SchemaDto>(`${url}/form-schema?productSpecificationId=1886&groupingCode=App&questionStageCode=Dependants&communicationId=5120`, options)]).subscribe(result => {
      
      this.schema = result[0].data
      this.uischema =  result[0].layout
    });

    this.ajv = createAjv({
      schemaId: 'id',
      allErrors: true,
      validateSchema:false
    });
    this.dateAdapter = dateAdapter;
    dateAdapter.setLocale(this.i18n.locale);
    
  }


  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:',  this.data);
  }
}

class SchemaDto
{
  data:object;
  layout:object;  
}
