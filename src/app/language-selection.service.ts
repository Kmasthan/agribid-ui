import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LabelConstants } from "./label-constants/label-constants";
import { EnglishConstnts } from "./label-constants/english-constants";

@Injectable({
    providedIn: 'root'
})
export class LanguageSelectionService {

    private selectedLabelConstant = new BehaviorSubject<LabelConstants>(new EnglishConstnts());
    getSelectedLabels$ = this.selectedLabelConstant.asObservable();

    setSelectedLabelConstant(selectedLabelConstant: LabelConstants): void {
        this.selectedLabelConstant.next(selectedLabelConstant);
    }
}