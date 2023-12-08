import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'la-project-header-component',
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand">LA Project</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerDropdown"
          aria-controls="headerDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="headerDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/home']">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/events']">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/blog']">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['/about-us']">About Us</a>
            </li>
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
              
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item">Action</a></li>
                <li><a class="dropdown-item">Another action</a></li>
                <li>
                  <a class="dropdown-item">Something else here</a>
                </li>
              </ul>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {}
