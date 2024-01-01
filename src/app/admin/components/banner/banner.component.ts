import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pagingConfig, { DEFAULT_PER_PAGE_OPTIONS } from '../../configs/paging.config';
import { BannerService } from '../../services/apis/banner.service';
import orderConstant from '../../constants/orderConstant';
import sortConstant from '../../constants/sortConstant';
import systemConfig from '../../configs/system.config';
import bannerConstant from '../../constants/banner.constant';
import animationConstant from '../../constants/animation.constant';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: animationConstant.animations
})
export class BannerComponent {
  //Init
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bannerService: BannerService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageIndex: params['pageIndex'] ? params['pageIndex'] : this.config.paging.pageIndex,
        pageSize: params['pageSize'] ? params['pageSize'] : this.config.paging.pageSize,
      };

      this.queryParameters = {
        ...params,
        type: params['type'] ? params['type'] : 0,
        place: params['place'] ? params['place'] : 0,
      };

      this.getBanners(request);
    });
  }

  public config: any = {
    paging: pagingConfig.default,
    baseUrl: systemConfig.baseFileSystemUrl,
    perPageOptions: DEFAULT_PER_PAGE_OPTIONS
  }

  public constant: any = {
    order: orderConstant,
    sort: sortConstant,
    banner: bannerConstant
  }

  //Banners
  public banners: any = [];
  public paging: any = {
    pageIndex: 0,
    pageSize: 0,
    sortBy: '',
    orderBy: '',
    totalPages: 0,
    totalRecords: 0
  }
  public selectedBanners: any = [];

  public queryParameters: any = {
    ...this.config.paging,
    place: 0,
    type: 0
  };

  public getBanners(request: any): any{
    this.bannerService.getBanners(request).subscribe((result: any) => {
      if(result.status){
        if(request.pageIndex !== 1 && result.data.items.length === 0){
          this.route.queryParams.subscribe(params => {
            const request = {
              ...params,
              pageIndex: 1,
            };
      
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: request,
              queryParamsHandling: 'merge',
            });
          });
        }

        this.banners = result.data.items;

        this.banners = this.banners.map((banner: any) => ({
          ...banner,
          placeName: this.constant.banner.places.find((place: any) => place.key === banner.place)?.value ?? '',
          typeName: this.constant.banner.types.find((type: any) => type.key === banner.type)?.value ?? '',
          status: new Date(banner.expired) < new Date() ? false : true
        }));

        if(this.banners.length === 0){
          this.paging.pageIndex = 1;
        }

        const { items, ...paging } = result.data;
        this.paging = paging;

        this.selectedBanners = [];
      }
    });
  };

  public selectAllBanners(event: any): void{
    if (event.target.checked) {
      this.selectedBanners = this.banners.map((teacher: any) => teacher.id);
    } else {
      this.selectedBanners = [];
    }
  }

  public handleOnSortAndOrderChange(orderBy: string): void{
    if(this.paging.orderBy === orderBy){
      this.paging.sortBy = this.paging.sortBy === this.constant.sort.asc ? this.constant.sort.desc: this.constant.sort.asc;
    }else{
      this.paging.sortBy = sortConstant.desc;
    }

    this.paging = {
      orderBy: orderBy,
      sortBy: this.paging.sortBy
    };

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        orderBy: this.paging.orderBy,
        sortBy: this.paging.sortBy,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  public toggleSelection(teacherId: number): void {
    // if (this.isSelected(teacherId)) {
    //     this.selectedItems = this.selectedItems.filter((id) => id !== teacherId);
    // } else {
    //     this.selectedItems.push(teacherId);
    // }
  }

  public isSelected(id: number): boolean {
    return this.selectedBanners.includes(id);
  }

  public handleSearchBanners(){
    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        title: this.queryParameters.title ? this.queryParameters.title : null,
        place: this.queryParameters.place ? this.queryParameters.place : null,
        type: this.queryParameters.type ? this.queryParameters.type : null,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }

  public handleOnDeleteMultiple(){
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     cancelButton: "btn btn-danger ml-2",
    //     confirmButton: "btn btn-success",
    //   },
    //   buttonsStyling: false
    // });
    // swalWithBootstrapButtons.fire({
    //   title: `Bạn có muốn xoá các bản ghi có Id: ${this.selectedItems.join(', ')} không?`,
    //   text: "Sau khi xoá bản sẽ không thể khôi phục dữ liệu!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Xác nhận",
    //   cancelButtonText: "Bỏ qua",
    //   reverseButtons: false
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const request = {
    //       ids: this.selectedItems
    //     }

    //     this.teacherService.deleteMultipleTeacher(request).subscribe((result: any) => {
    //       if(result.status){
    //         swalWithBootstrapButtons.fire({
    //           title: "Xoá thành công!",
    //           text: result.message,
    //           icon: "success"
    //         });

    //         this.route.queryParams.subscribe(params => {
    //           const request = {
    //             ...params,
    //             pageIndex: params['pageIndex'] ? params['pageIndex'] : DEFAULT_PAGE_INDEX,
    //             pageSize: params['pageSize'] ? params['pageSize'] : DEFAULT_PAGE_SIZE,
    //           };
        
    //           this.getTeachers(request);
    //         });
    //       }
    //     },error => {
    //       console.log(error);
    //       this.ngxToastr.error(error.error.message,'',{
    //         progressBar: true
    //       });
    //     });
    //   }
    // });
  }

  public handleOnChangePage(page: number) {
    if (page >= 1 && page <= this.paging.totalPages) {
      this.paging.pageIndex = page;
      
      this.route.queryParams.subscribe(params => {
        const request = {
          ...params,
          pageIndex: this.paging.pageIndex,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: request,
          queryParamsHandling: 'merge',
        });
      });
    }
  }

  handleOnPerPageChange(event: any): void{
    this.paging.pageSize = +event.target.value;

    this.route.queryParams.subscribe(params => {
      const request = {
        ...params,
        pageSize: this.paging.pageSize,
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: request,
        queryParamsHandling: 'merge',
      });
    });
  }
}
