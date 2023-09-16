import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndsWithHtmlGuard } from 'src/app/student/shared/guards/endsWithHtml.guard';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent {
  public slug: any;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params)
      this.slug = params['slug']
    })
  }
}
