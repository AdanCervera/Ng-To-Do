import { Injectable } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  private activeMenu: ContextMenu | null = null;

  setActiveMenu(menu: ContextMenu) {
    if (this.activeMenu && this.activeMenu !== menu) {
      this.activeMenu.hide();
    }
    this.activeMenu = menu;
  }

  clearActiveMenu() {
    this.activeMenu = null;
  }
}
