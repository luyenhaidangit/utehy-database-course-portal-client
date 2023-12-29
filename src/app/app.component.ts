import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { AuthService } from './student/services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private loader: LoadingBarService, private authService: AuthService) {}

  ngOnInit(): void {
  }

  title = 'Website hỗ trợ dạy và học môn Cơ sở dữ liệu - Database Course Portal';

  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
}
