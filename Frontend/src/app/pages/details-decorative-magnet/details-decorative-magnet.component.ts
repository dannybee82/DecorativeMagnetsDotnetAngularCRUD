import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorativeMagnetsService } from '../../services/decorative-magnets/decorative-magnets.service';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { ImagesService } from '../../services/images/images.service';
import { Image } from '../../models/images/image.interface';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-details-decorative-magnet',
  imports: [BackButtonComponent],
  templateUrl: './details-decorative-magnet.component.html',
  styleUrl: './details-decorative-magnet.component.scss',
})
export class DetailsDecorativeMagnetComponent implements OnInit {

  protected readonly id: InputSignal<string> = input.required<string>();

  decorativeMagnet: WritableSignal<DecorativeMagnet | undefined> = signal(undefined);
  image: WritableSignal<Image | undefined> = signal(undefined);

  private decorativeMagnetsService = inject(DecorativeMagnetsService);
  private imageService = inject(ImagesService);
  private toastService = inject(ToastService);
  
  ngOnInit(): void {
    if(this.id()) {
      const id: number = parseInt(this.id());

      if(!isNaN(id)) {
        this.decorativeMagnetsService.getById<DecorativeMagnet>(id).subscribe({
          next: (data: DecorativeMagnet) => {
            this.decorativeMagnet.set(data);
          },
          error: () => {
            this.toastService.error('Can\'t load Decorative Magnet');            
          },
          complete: () => {
            if(this.decorativeMagnet()) {
              this.getImage();
            }
          }
        });
      } else {
        this.toastService.error('Can\'t load Decorative Magnet');      
      }
    } else {
      this.toastService.error('Can\'t load Decorative Magnet');
    }
  }

  private getImage(): void {
    this.imageService.getImageById(this.decorativeMagnet()!.imageId ?? 0).subscribe({
      next: (image: Image) => {
        this.image.set(image);
      },
      error: () => {
        this.toastService.error('Can\'t load Image');
      }
    });
  }

}