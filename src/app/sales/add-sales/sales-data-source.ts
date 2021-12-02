
import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { ThrowStmt } from '@angular/compiler'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { catchError, finalize } from 'rxjs/operators'

export class salesDataSource implements DataSource<any> {

    constructor(state) {

    }

    private saleSubject = new BehaviorSubject<any>([])
    private loadingSubject = new BehaviorSubject<boolean>(false)
    public loading$ = this.loadingSubject.asObservable();



    connect(CollectionViewer: CollectionViewer): Observable<any> {
        return this.saleSubject.asObservable();

    }

    disconnect(CollectionViewer: CollectionViewer): void {
        this.saleSubject.complete();
        this.loadingSubject.complete();
    }

    addSales(sale: Observable<any>) {
        this.loadingSubject.next(true);

        sale.pipe(
            catchError( () => of([])),
            finalize( () => this.loadingSubject.next(false))
        ).subscribe( sales => this.saleSubject.next(sales))


    }


}