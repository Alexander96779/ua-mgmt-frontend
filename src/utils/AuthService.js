export default class AuthService {
    static setToken(token) {
      localStorage.setItem('data-analytics_token', token);
    }
  
    static getToken() {
      return localStorage.getItem('data-analytics_token');
    }
  
    static setUsername(email) {
      localStorage.setItem('username', email);
    }

    static getUsername() {
      localStorage.getItem('username');
    }
  }