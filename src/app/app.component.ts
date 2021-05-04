import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { concatMap, exhaustMap, filter, mergeMap, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    operatorType = OperatorType;
    mergeMapClickedCount: number = 0;
    switchMapClickedCount: number = 0;
    concatMapClickedCount: number = 0;
    exhaustMapClickedCount: number = 0;
    clickAction$: Subject<OperatorType> = new Subject();

    constructor(
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.clickAction$.pipe(
            filter(operatorType => operatorType === OperatorType.MergeMap),
            tap(() => this.mergeMapClickedCount++),
            mergeMap(() => this.fetchTodos())
        ).subscribe();

        this.clickAction$.pipe(
            filter(operatorType => operatorType === OperatorType.SwitchMap),
            tap(() => this.switchMapClickedCount++),
            switchMap(() => this.fetchTodos())
        ).subscribe();

        this.clickAction$.pipe(
            filter(operatorType => operatorType === OperatorType.ConcatMap),
            tap(() => this.concatMapClickedCount++),
            concatMap(() => this.fetchTodos())
        ).subscribe();

        this.clickAction$.pipe(
            filter(operatorType => operatorType === OperatorType.ExhaustMap),
            tap(() => this.exhaustMapClickedCount++),
            exhaustMap(() => this.fetchTodos())
        ).subscribe();
    }

    fetchTodos(): Observable<any[]> {
        return this.http.get<any[]>('https://jsonplaceholder.typicode.com/todos');
    }
}


export enum OperatorType {
    SwitchMap,
    MergeMap,
    ConcatMap,
    ExhaustMap
}
