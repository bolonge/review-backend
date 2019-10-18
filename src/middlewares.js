export const isAuthenticated = request => {
  if (!request.user) {
    throw Error("회원가입이 필요합니다");
  }
  return;
};
