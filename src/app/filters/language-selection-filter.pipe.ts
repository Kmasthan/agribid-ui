import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'languageFilter'
})
export class LanguageSelectionFilter implements PipeTransform {
    transform(items: string[], searchValue: string) {
        if (searchValue) {
            return items.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase()) || item == searchValue);
        }
        if (items && items.length > 0) {
            return items;
        } else {
            return [];
        }
    }
}