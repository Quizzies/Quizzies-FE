export function getToken(): string | null {
  return localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;
}