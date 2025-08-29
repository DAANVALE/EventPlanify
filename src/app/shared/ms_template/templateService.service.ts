import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { HttpClient } from "@angular/common/http";
import { TemplateModel } from "../../models/ms_template/template";
import { catchError, Observable, map, throwError, of } from "rxjs";
import { templateModelTs } from "../../assets/template-test-data";

@Injectable({
  providedIn: 'root',
})
export class TemplateService{

  private API = environment.msReservesUrl + '/template';

  constructor(private http: HttpClient){

  }

  private templateModel = templateModelTs;

  getAll(): Observable<TemplateModel[]>
  {
    return this.http.get<TemplateModel[]>(this.API).
    pipe(map((data: TemplateModel[]) => data ),
      catchError(error => {
        this.handleError(error);
        return of(this.templateModel);
      })
    );
  }

  getByEventTypeId(id: number): Observable<TemplateModel[]>
  {
    return this.http.get<TemplateModel[]>(this.API + '/EventType/'+id)
    .pipe(map((data: TemplateModel[]) => data),
      catchError(error => {
        this.handleError(error);
        return of([this.templateModel[id]]);
      })
    );
  }

  private handleError(error: any): Observable<never>{
    return throwError(() => new Error('Something ocurried in eventTypeService.', error));
  }

}
