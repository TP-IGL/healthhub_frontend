import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthState } from '../services/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // Helper function to safely access localStorage
  private getLocalStorageState(): Partial<AuthState> {
    if (typeof localStorage === 'undefined') {
      return {}; // Fallback for environments where localStorage is not available
    }
    try {
      return JSON.parse(localStorage.getItem('authState') || '{}');
    } catch {
      return {}; // Handle invalid JSON
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const savedState = this.getLocalStorageState();
    const isAuthenticated = savedState.isAuthenticated === true;
    const userRole = savedState.role;

    // Ensure the user is authenticated
    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    // Check the required role from the route's data
    const requiredRole = route.data['role'];
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/']); // Redirect to login or appropriate page
      return false;
    }

    return true;
  }
}
