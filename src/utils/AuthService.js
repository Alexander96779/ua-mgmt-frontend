export default class AuthService {
    static setToken(token) {
      localStorage.setItem('user_account_token', token);
    }
  
    static getToken() {
      return localStorage.getItem('user_account_token');
    }
  
    static setUsername(email) {
      localStorage.setItem('username', email);
    }

    static getUsername() {
      localStorage.getItem('username');
    }
  }