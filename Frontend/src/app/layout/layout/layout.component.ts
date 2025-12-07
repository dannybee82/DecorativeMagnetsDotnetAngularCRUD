import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { PagerComponent } from '../../components/pager/pager.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MenuComponent, PagerComponent, PaginationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {

  showPaginationAndPager: WritableSignal<boolean> = signal(true);

  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd) {
        const navigation: NavigationEnd = data;
        if(navigation.url.startsWith('/create-or-update') || navigation.url.startsWith('/details')) {
          this.showPaginationAndPager.set(false);
        } else {
          this.showPaginationAndPager.set(true);
        }
      }
    });
  }

}