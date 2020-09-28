export default function(str) {
  if (!str || !str.replace(/ /g, "")) {
    return true;
  }

  return false;
}
