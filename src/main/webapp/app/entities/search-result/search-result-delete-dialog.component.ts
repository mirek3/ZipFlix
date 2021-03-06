import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISearchResult } from 'app/shared/model/search-result.model';
import { SearchResultService } from './search-result.service';

@Component({
    selector: 'jhi-search-result-delete-dialog',
    templateUrl: './search-result-delete-dialog.component.html'
})
export class SearchResultDeleteDialogComponent {
    searchResult: ISearchResult;

    constructor(
        protected searchResultService: SearchResultService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.searchResultService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'searchResultListModification',
                content: 'Deleted an searchResult'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-search-result-delete-popup',
    template: ''
})
export class SearchResultDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ searchResult }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SearchResultDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.searchResult = searchResult;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
