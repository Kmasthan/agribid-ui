import { EnglishConstnts } from "./english-constants";
import { LabelConstants } from "./label-constants";
import { TeluguConstnts } from "./telugu-constants";

// LabelConstantsFactory creation was done usign the **Flyweigh Design Pattern**
export class LabelConstantsFactory {
    private static labelConstantsMap = new Map<string, LabelConstants>();
    private static currentInstance = new LabelConstantsFactory();

    private static ENGLISH = 'english';
    private static TELUGU = 'తెలుగు';

    /**
     * 
     * @returns all the supported languages
     */
    static getSupportedLanguages() {
        return ['English', 'తెలుగు'];
    }

    /**
     * 
     * @param selection 
     * @returns the label constant instance for user selection
     */
    static getLabels(selection: string): LabelConstants {
        if (selection.toLowerCase() == this.ENGLISH) {
            return this.currentInstance.selectionBasedLabelsBuilder(this.labelConstantsMap, selection.toLowerCase());
        } else if (selection.toLowerCase() == this.TELUGU) {
            return this.currentInstance.selectionBasedLabelsBuilder(this.labelConstantsMap, selection.toLowerCase());
        } else {
            return new EnglishConstnts();
        }
    }

    /**
     * 
     * @param labelConstantsMap 
     * @param selection 
     * @returns the selected label constants instance
     */
    private selectionBasedLabelsBuilder(labelConstantsMap: Map<string, LabelConstants>, selection: string): LabelConstants {
        if (labelConstantsMap.has(selection)) {
            return labelConstantsMap.get(selection)!;
        } else {
            switch (selection) {
                // english labels selection
                case LabelConstantsFactory.ENGLISH:
                    labelConstantsMap.set(selection, new EnglishConstnts());
                    return labelConstantsMap.get(selection)!;
                // telugu labels selection
                case LabelConstantsFactory.TELUGU:
                    labelConstantsMap.set(selection, new TeluguConstnts());
                    return labelConstantsMap.get(selection)!;
                // default
                default:
                    return new EnglishConstnts();
            }
        }
    }

}