import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { TToastColor } from '../core/helpers/constants';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastrService: ToastrService
  ) { }
  async showToastr(title: string, color: TToastColor) {
    //Làm sao để hiển thị toast theo color tương ứng với suscess, error, warning, info
    //Tôi muốn viết tắt hơn để không phải viết 4 lần
    //Hãy giúp tôi
    this.toastrService[color](title);
  }
}
