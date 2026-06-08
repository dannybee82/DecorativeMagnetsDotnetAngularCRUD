import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { DecorativeMagnets } from '../../services/decorative-magnets/decorative-magnets';
import { DecorativeMagnet } from '../../models/decorative-magnets/decorative-magnet.interface';
import { Images } from '../../services/images/images';
import { Image } from '../../models/images/image.interface';
import { BackButton } from '../../components/back-button/back-button';
import { Toast } from '../../services/toast/toast';

@Component({
  selector: 'app-details-decorative-magnet',
  imports: [BackButton],
  templateUrl: './details-decorative-magnet.html',
  styleUrl: './details-decorative-magnet.scss',
})
export class DetailsDecorativeMagnet implements OnInit {

  protected readonly id: InputSignal<string> = input.required<string>();

  decorativeMagnet: WritableSignal<DecorativeMagnet | undefined> = signal(undefined);
  image: WritableSignal<Image | undefined> = signal(undefined);

  private decorativeMagnetsService = inject(DecorativeMagnets);
  private imageService = inject(Images);
  private toastService = inject(Toast);
  
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