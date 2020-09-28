export default function(email) {
  if (!email || !email.replace(/ /g, "")) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
