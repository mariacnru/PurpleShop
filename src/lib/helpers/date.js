const toPersianDate = (date) => {
  //Way 1
  //   return new Date(date).toLocaleDateString("fa-IR");
  //Way2
  //   return new Intl.DateTimeFormat("fa-IR").format(new Date(date));
  //Way3
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export default toPersianDate;
