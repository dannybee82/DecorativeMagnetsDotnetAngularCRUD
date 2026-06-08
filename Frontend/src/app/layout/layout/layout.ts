import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { Menu } from '../../components/menu/menu';
import { Pager } from '../../components/pager/pager';
import { Pagination } from '../../components/pagination/pagination';
import { SortAlphabetically } from '../../components/sort-alphabetically/sort-alphabetically';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Menu, Pager, Pagination, SortAlphabetically],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {

  showPaginationAndPager: WritableSignal<boolean> = signal(true);
  showSorting: WritableSignal<boolean> = signal(true);

  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if(data instanceof NavigationEnd) {
        const navigation: NavigationEnd = data;
        if(navigation.url.startsWith('/create-or-update') || navigation.url.startsWith('/details')) {
          this.showPaginationAndPager.set(false);
          this.showSorting.set(false);
        } else {
          this.showPaginationAndPager.set(true);
          this.showSorting.set(true);
        }
      }
    });
  }

}