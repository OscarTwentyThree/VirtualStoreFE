import Swal from "sweetalert2";

export const SwalAlert = (type , message) => {
  return( 
    Swal.fire({
    icon: type,
    title: message,
    timerProgressBar: true,
    timer: 2000,
    showConfirmButton: false,
    })
  );
}

export const SwalAlertPass = (type , message) => {
  return( 
    Swal.fire({
    icon: type,
    title: message,
    timerProgressBar: true,
    timer: 4000,
    showConfirmButton: false,
    })
  );
}
export const SwalAlertWithConfirm = (type , message, btnConfirmText, btnCancelText) => {
  return( 
    Swal.fire({
    icon: type,
    title: message,
    showCancelButton: true,
    confirmButtonColor: '#0d6efd',
    cancelButtonColor: '#d33',
    confirmButtonText: btnConfirmText,
    cancelButtonText: btnCancelText
    })
  );
}