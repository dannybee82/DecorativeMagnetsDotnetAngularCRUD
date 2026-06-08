import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorativeMagnets } from '../../services/decorative-magnets/decorative-magnets';
import { Thumbnails } from '../../services/thumbnails/thumbnails';
import { PaginatedList } from '../../models/paginated-list/paginated-list.interface';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { Thumbnail } from '../../models/thumbnails/thumbnail.interface';
import { ScrollToTop } from '../../components/scroll-to-top/scroll-to-top';
import { Fullscreen } from '../../components/fullscreen/fullscreen';
import { Images } from '../../services/images/images';
import { Image } from '../../models/images/image.interface';
import { Observable, of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Toast } from '../../services/toast/toast';
import { PaginationAndPager } from '../../services/pagination-and-pager/pagination-and-pager';
import { PaginationAndPagerInterface } from '../../models/pagination-and-pager/pagination-and-pager.interface';
import { Sort } from '../../services/sort/sort';
import { SortAlphabeticallyInterface, SortAlphabeticallyAscending, SortAlphabeticallyDefault, SortAlphabeticallyDescending, SortAlphabeticallyNone } from '../../models/sort/sort.interface';

@Component({
  selector: 'app-all-decorative-magnets',
  imports: [ScrollToTop, Fullscreen, RouterModule],
  templateUrl: './all-decorative-magnets.html',
  styleUrl: './all-decorative-magnets.scss',
})
export class AllDecorativeMagnets implements OnInit {

  protected allDecorativeMagnets: WritableSignal<DecorativeMagnet[]> = signal([]);
  protected allThumbnails: WritableSignal<Thumbnail[]> = signal([]);
  protected allThumbnailsLoaded: WritableSignal<boolean> = signal(false);
  protected isFullScreen: WritableSignal<boolean> = signal(false);
  protected fullScreenData: WritableSignal<{decorativeMagnet: DecorativeMagnet | undefined, image: string | undefined }> = signal({decorativeMagnet: undefined, image: undefined});
  protected disableParentHover: WritableSignal<boolean> = signal(false);

  private _pageNumber: WritableSignal<number> = signal(1);
  private _pageSize: WritableSignal<number> = signal(8);
  private _sortAlphabetically: WritableSignal<SortAlphabeticallyAscending | SortAlphabeticallyDescending | SortAlphabeticallyNone | SortAlphabeticallyDefault> = signal('DEFAULT');

  private decorativeMagnetsService = inject(DecorativeMagnets);
  private imagesService = inject(Images);
  private thumbnailsService = inject(Thumbnails);
  private toastService = inject(Toast);
  private paginationAndPagerService = inject(PaginationAndPager);
  private sortService = inject(Sort);

  ngOnInit(): void {
    this.paginationAndPagerService.paginationAndPager.subscribe((pagination: PaginationAndPagerInterface) => {
      if(pagination.pageNumber !== this._pageNumber() || pagination.pageSize !== this._pageSize()) {
        this._pageNumber.set(pagination.pageNumber);
        this._pageSize.set(pagination.pageSize);
        this.getPagedList();
      }
    });

    this.sortService.sortState.subscribe((data: SortAlphabeticallyInterface) => {
      if(data.sort !== 'DEFAULT') {
        this._sortAlphabetically.set(data.sort);
        this.getPagedList();
      }
    });

    this.getPagedList(); 
  }

  getThumbnail(thumbnailId: number): Thumbnail | undefined {
    if(this.allThumbnails().length > 0) {
      return this.allThumbnails().find(item => item.id === thumbnailId);
    }

    return undefined;
  }

  openFullScreen(decorativeMagnet: DecorativeMagnet): void {
    //Get full image.
    const image$: Observable<string> = this.imagesService.getImageById(decorativeMagnet.imageId ?? 0).pipe(
      switchMap((data: Image) => {
        if(data) {
          return of(data.base64 !== '' ? data.base64 : '');
        }

        return of('');
      })
    );

    image$.subscribe((base64: string) => {
      if(base64 !== '') {
        this.fullScreenData.set({
          decorativeMagnet: decorativeMagnet,
          image: base64
        });

        this.isFullScreen.set(true);
      } else {
        this.toastService.error('Can\'t show image in Fullscreen');
      }
    });
  }

  closeFullScreen(): void {
    this.isFullScreen.set(false);

    this.fullScreenData.set({
      decorativeMagnet: undefined,
      image: undefined
    });
  }

  private getPagedList(): void {
    this.decorativeMagnetsService.getPagedList(this._pageNumber(), this._pageSize(), this._sortAlphabetically()).subscribe({
      next: (data: PaginatedList<DecorativeMagnet>) => {
        this.allDecorativeMagnets.set(data.items);
        this.paginationAndPagerService.updateTotalPages(data.totalPages);
      },
      error: () => {
        this.toastService.error('Can\'t load Decorative Magnets');
      },
      complete: () => {        
        this.loadThumbnails();
      }
    });
  }

  private loadThumbnails(): void {
    if(this.allDecorativeMagnets().length > 0) {
      const ids: number[] = this.allDecorativeMagnets().map(item => item.thumbnailId).filter(item => item !== undefined);

      this.thumbnailsService.getAllThumbnails(ids).subscribe({
        next: (data: Thumbnail[]) => {
          this.allThumbnails.set(data);
        },
        error: () => {
          this.toastService.error('Can\t load Thumbnails');
        },
        complete: () => {
            this.allThumbnailsLoaded.set(true);
        }
      });
    }
  }

}