function formatCityName(address) {
  if (!address || address.replace(/ /g, "") === "г.Ташкент") {
    return "г. Ташкент";
  }
  if (address && address.indexOf("г. Ташкент") !== -1) {
    return address.replace(/г. Ташкент,/g, "");
  }
  return address;
}

export default formatCityName;
