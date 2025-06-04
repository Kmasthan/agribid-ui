import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    setLoggedInUser(value: string) {
        if (this.isBrowser && typeof localStorage !== 'undefined') {
            localStorage.setItem('login-user', value);
        }
    }

    getLoggedInUser() {
        if (this.isBrowser && typeof localStorage !== 'undefined') {
            return localStorage.getItem('login-user');
        }
        return null
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    exists(key: string): boolean {
        return localStorage.getItem(key) !== (null || undefined);
    }
}