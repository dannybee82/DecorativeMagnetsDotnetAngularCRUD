import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { form, required, Field, validateTree } from '@angular/forms/signals';
import { OpenFileComponent } from '../../components/open-file/open-file.component';
import { OpenFilesService } from '../../services/open-files/open-files.service';
import { DecorativeMagnetFormData } from '../../models/decorative-magnets/decorative-magnet-form-data.interface';
import { DecorativeMagnetsService } from '../../services/decorative-magnets/decorative-magnets.service';
import { ThumbnailsService } from '../../services/thumbnails/thumbnails.service';
import { EMPTY, Observable, of, switchMap } from 'rxjs';
import { Thumbnail } from '../../models/thumbnails/thumbnail.interface';
import { DecorativeMagnetCreateOrUpdate } from '../../models/decorative-magnets/decorative-magnet-create-or-update.interface';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';
import { DeleteModalComponent } from '../../components/delete-modal/delete-modal.component';
import { DeleteModal } from '../../models/delete-modal/delete-modal.interface';
import { PaginationAndPagerService } from '../../services/pagination-and-pager/pagination-and-pager.service';

@Component({
  selector: 'app-create-or-update-decorative-magnets',
  imports: [OpenFileComponent, Field, RouterLink, RouterModule, DeleteModalComponent],
  templateUrl: './create-or-update-decorative-magnets.component.html',
  styleUrl: './create-or-update-decorative-magnets.component.scss',
})
export class CreateOrUpdateDecorativeMagnetsComponent implements OnInit {

  protected readonly id: InputSignal<string> = input.required<string>();

  isUpdateMode: WritableSignal<boolean> = signal(false);
  deleteModal: WritableSignal<DeleteModal | undefined> = signal(undefined);

  private readonly decorativeMagnet: WritableSignal<DecorativeMagnetFormData> = signal({
    id: 0,
    name: '',
    thumbnailId: 0,
    imageBase64: ''
  });
  protected readonly decorativeMagnetForm = form(this.decorativeMagnet, (form) => {
    required(form.name, { message: 'Name is required' });
    validateTree(form, context => {
      return context.field.imageBase64().value() === '' ?  
        { field: context.field.imageBase64, kind: 'no-image', message: 'No image is set' } :
        undefined;
    })
  });
  private _decorativeMagnetToUpdate: WritableSignal<DecorativeMagnet | undefined> = signal(undefined);
  private _thumbnailToUpdate: WritableSignal<Thumbnail | undefined> = signal(undefined);

  private decorativeMagnetService = inject(DecorativeMagnetsService);
  private thumbnailService = inject(ThumbnailsService);
  private openFilesService = inject(OpenFilesService);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private paginationAndPagerService = inject(PaginationAndPagerService);

  ngOnInit(): void {
    if(this.id() && this.id() !== 'undefined'){
      const id: number = parseInt(this.id());

      if(!isNaN(id)) {
        this.getData(id);
      }
    }
  }
  
  submit(event: SubmitEvent): void {
    event.preventDefault();

    if(this.decorativeMagnetForm().valid()) {
      this.createOrUpdate();
    } else {
      const errors: string = this.decorativeMagnetForm().errorSummary().map(item => item.message).filter(item => item !== undefined).join(',');
      this.toastService.error('Form is invalid: ' + errors);      
    }
  }

  loadFile($event: File): void {
    this.openFilesService.readFile($event).then((result: string | null) => {
      if (result) {
        if (
          this.openFilesService.isValidDataType(result) &&
          this.openFilesService.checkMaximumSize($event.size)
        ) {
          this.decorativeMagnetForm.thumbnailId().setControlValue(0);
          this.decorativeMagnetForm.imageBase64().setControlValue(result);
        } else {
          if (!this.openFilesService.isValidDataType(result)) {
            this.toastService.error('File is invalid');
          } else if (this.openFilesService.checkMaximumSize($event.size)) {
            this.toastService.error('File exceeds 10 MB');
          }
        }
      } else {
        this.toastService.error('Invalid file');
      }
    });
  }
  removeFile(): void {
    this.decorativeMagnetForm.thumbnailId().setControlValue(0);
    this.decorativeMagnetForm.imageBase64().setControlValue('');
  }

  openDeleteModal(): void {
    if(this._decorativeMagnetToUpdate()) {
      const dialogData: DeleteModal = {
        title: 'Delete Decorative Magnet',
        message: 'Do you really want to delete the item below?',
        additionalText: this._decorativeMagnetToUpdate()!.name ?? '',
        cancelText: 'Cancel',
        deleteText: 'Delete'
      }

      this.deleteModal.set(dialogData);

    } else {
      this.toastService.error('There is no appropriate data loaded.');
    }
  }

  execDelete(event: boolean): void {
    this.deleteModal.set(undefined);

    if(event) {
      this.deleteDecorativeMagnet(this._decorativeMagnetToUpdate()!.id ?? 0);
    }
  }

  private assignValues(): DecorativeMagnetCreateOrUpdate {
    const data: DecorativeMagnetCreateOrUpdate = {
      id: this.decorativeMagnetForm.id().value() === 0 ? undefined : this.decorativeMagnetForm.id().value(),
      name: this.decorativeMagnetForm.name().value(),
      thumbnailId: this.decorativeMagnetForm.thumbnailId().value() === 0 ? undefined : this.decorativeMagnetForm.thumbnailId().value(),
      imageBase64: this.decorativeMagnetForm.imageBase64().value()
    }

    return data;
  }

  private getData(id: number): void {
    const decorativeMagnet$ = this.decorativeMagnetService.getById<DecorativeMagnet>(id).pipe(
      switchMap((data: DecorativeMagnet) => {
        if(data) {
          this._decorativeMagnetToUpdate.set(data);
          return of(data);
        }

        this.toastService.error('Can\'t load Decorative Magnet');
        return EMPTY;
      })
    );

    const thumbnail$: Observable<Thumbnail> = decorativeMagnet$.pipe(
      switchMap((data: DecorativeMagnet) => {
        if(data) {
          return this.thumbnailService.getThumbnailById(data.thumbnailId ?? 0)
        }

        this.toastService.error('Can\'t load Thumbnail');
        return EMPTY;
      })
    );

    thumbnail$.subscribe((data: Thumbnail) => {
      if(data) {
        this._thumbnailToUpdate.set(data);
        this.decorativeMagnetForm.id().value.set(this._decorativeMagnetToUpdate()!.id ?? 0);
        this.decorativeMagnetForm.name().value.set(this._decorativeMagnetToUpdate()!.name);
        this.decorativeMagnetForm.thumbnailId().value.set(this._thumbnailToUpdate()!.id ?? 0);
        this.decorativeMagnetForm.imageBase64().value.set(this._thumbnailToUpdate()!.base64 ?? '');
        this.isUpdateMode.set(true);
      }
    });
  }

  private createOrUpdate(): void {
    const action$: Observable<void> = this.isUpdateMode() ?
      this.decorativeMagnetService.update<DecorativeMagnetCreateOrUpdate>(this.assignValues()) :
      this.decorativeMagnetService.create<DecorativeMagnetCreateOrUpdate>(this.assignValues());

    action$.subscribe({
      next: () => {
        this.toastService.success(this.isUpdateMode() ? 'Decorative Magnet successfully updated' : 'Decorative Magnet successfully created');
      },
      error: () => {
        this.toastService.error(this.isUpdateMode() ? 'Can\'t update Decorative Magnet' : 'Can\'t create Decorative Magnet');
      },
      complete: () => {
        if(!this.isUpdateMode()) {
          this.paginationAndPagerService.reset();
        }
        this.router.navigate(['/']);
      }
    });
  }

  private deleteDecorativeMagnet(id: number): void {
    this.decorativeMagnetService.delete(id).subscribe({
      next: () => {
        this.toastService.success('Decorative Magnet successfully deleted');
      },
      error: () => {
        this.toastService.error('Can\'t delete Decorative Magnet');
      },
      complete: () => {
        this.router.navigate(['/']);
      }
    });
  }

}
