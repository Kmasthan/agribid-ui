import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    setSelectedLanguage(value: string) {
        if (this.isBrowser && typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('selected-language', value);
        }
    }

    getSelectedLanguage() {
        if (this.isBrowser && typeof sessionStorage !== 'undefined') {
            return sessionStorage.getItem('selected-language');
        }
        return null
    }

    remove(key: string): void {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }

    exists(key: string): boolean {
        return sessionStorage.getItem(key) !== (null || undefined);
    }
}