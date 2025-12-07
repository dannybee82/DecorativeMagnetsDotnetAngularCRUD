import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorativeMagnetsService } from '../../services/decorative-magnets/decorative-magnets.service';
import { ThumbnailsService } from '../../services/thumbnails/thumbnails.service';
import { PaginatedList } from '../../models/paginated-list/paginated-list.interface';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { Thumbnail } from '../../models/thumbnails/thumbnail.interface';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';
import { FullscreenComponent } from '../../components/fullscreen/fullscreen.component';
import { ImagesService } from '../../services/images/images.service';
import { Image } from '../../models/images/image.interface';
import { Observable, of, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { PaginationAndPagerService } from '../../services/pagination-and-pager/pagination-and-pager.service';
import { PaginationAndPager } from '../../models/pagination-and-pager/pagination-and-pager.interface';

@Component({
  selector: 'app-all-decorative-magnets',
  imports: [ScrollToTopComponent, FullscreenComponent, RouterModule],
  templateUrl: './all-decorative-magnets.component.html',
  styleUrl: './all-decorative-magnets.component.scss',
})
export class AllDecorativeMagnetsComponent implements OnInit {

  protected allDecorativeMagnets: WritableSignal<DecorativeMagnet[]> = signal([]);
  protected allThumbnails: WritableSignal<Thumbnail[]> = signal([]);
  protected allThumbnailsLoaded: WritableSignal<boolean> = signal(false);
  protected isFullScreen: WritableSignal<boolean> = signal(false);
  protected fullScreenData: WritableSignal<{decorativeMagnet: DecorativeMagnet | undefined, image: string | undefined }> = signal({decorativeMagnet: undefined, image: undefined});
  protected disableParentHover: WritableSignal<boolean> = signal(false);

  private _pageNumber: WritableSignal<number> = signal(1);
  private _pageSize: WritableSignal<number> = signal(8);

  private decorativeMagnetsService = inject(DecorativeMagnetsService);
  private imagesService = inject(ImagesService);
  private thumbnailsService = inject(ThumbnailsService);
  private toastService = inject(ToastService);
  private paginationAndPagerService = inject(PaginationAndPagerService);

  ngOnInit(): void {
    this.paginationAndPagerService.paginationAndPager.subscribe((pagination: PaginationAndPager) => {
      if(pagination.pageNumber !== this._pageNumber() || pagination.pageSize !== this._pageSize()) {
        this._pageNumber.set(pagination.pageNumber);
        this._pageSize.set(pagination.pageSize);
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
    this.decorativeMagnetsService.getPagedList(this._pageNumber(), this._pageSize()).subscribe({
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
