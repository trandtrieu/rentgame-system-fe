export const convertDollarToVND = (soTien) => {
  if (typeof soTien === "number" && !isNaN(soTien)) {
    var soTienDaXuLi = soTien.toLocaleString("vi-VN");
    return soTienDaXuLi;
  } else {
    return "";
  }
};
