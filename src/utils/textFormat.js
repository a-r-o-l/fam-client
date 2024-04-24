export const textFormat = (texts, format) => {
  switch (format) {
    case "uppercase":
      return texts.map((text) => text.toUpperCase()).join(" ");
    case "capitalize":
      return (
        texts.join(" ").toLowerCase().charAt(0).toUpperCase() +
        texts.join(" ").slice(1)
      );
    case "allcapitalize":
      return texts
        .map(
          (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        )
        .join(" ");
    default:
      return texts.join(" ");
  }
};
