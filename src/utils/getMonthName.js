export const getMonthName = (month) => {
  const months = {
    2: "Enero",
    3: "Febrero",
    4: "Marzo",
    5: "Abril",
    6: "Mayo",
    7: "Junio",
    8: "Julio",
    9: "Agosto",
    10: "Septiembre",
    11: "Octubre",
    12: "Noviembre",
    1: "Diciembre",
  };

  return months[Number(month)];
};
