// Simple, dependency-free regex validators shared by the auth routes.

// name: letters and spaces only, 2-40 chars
export const isValidName = (name) => /^[A-Za-z\s]{2,40}$/.test(name.trim());

// email: standard shape check (not exhaustive RFC 5322, deliberately simple)
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

// Indian mobile numbers: optional +91, then a 10 digit number starting 6-9
export const isValidPhone = (phone) =>
  /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone.trim());

// password: min 8 chars, at least one letter and one number
export const isValidPassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

// Delhi NCR pincode allow-list check happens against a prefix list rather
// than a single regex, since NCR spans multiple non-contiguous ranges.
const NCR_PIN_PREFIXES = ["11", "122", "201", "121", "124", "130", "131"];
export const isDelhiNCRPincode = (pincode) => {
  const p = String(pincode).trim();
  if (!/^\d{6}$/.test(p)) return false;
  return NCR_PIN_PREFIXES.some((prefix) => p.startsWith(prefix));
};
