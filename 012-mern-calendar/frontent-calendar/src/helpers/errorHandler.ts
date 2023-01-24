import { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export const errorHandler = (err:AxiosError,title:string,defaultErrorMsg = '') => {
  const errorResponse = err.response?.data as any;

  // let msg = 'No se puedo guardar el evento'
  let msg = defaultErrorMsg
  if (!!errorResponse?.msg) {
    msg = errorResponse?.msg
  } else if (!!errorResponse.errors) {
    const arrErrors = Object.values(errorResponse.errors).map(
      (e: any) => e.msg
    );
    msg = arrErrors.join(', ')
  }
  Swal.fire(title,msg,'error')
}
