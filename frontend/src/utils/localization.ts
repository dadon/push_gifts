class Localization {
    data: any;
    defaultLanguage: string = "en";
    currentLanguage: string = "en";

    constructor() {
        this.data = null;
    }

    init(localizationData: any, globalContext?: object) {
        this.data = {};

        for (let id in localizationData) {
            this.data[id] = {};
            for (let lang in localizationData[id]) {
                this.data[id][lang] = this._replaceParams(localizationData[id][lang], globalContext);
            }
        }
    }

    get(id: string, paramsObj: any = null, addLineBreak: boolean = false): string {
        let value = id;

        if (this.data && this.data[id]) {
            if (this.data[id][this.currentLanguage] && this.data[id][this.currentLanguage].length) {
                value = this.data[id][this.currentLanguage];
            } else if (this.data[id][this.defaultLanguage] && this.data[id][this.defaultLanguage].length) {
                value = this.data[id][this.defaultLanguage];
            }
        }

        value = this._replaceParams(value, paramsObj, addLineBreak);

        return value;
    }

    setLanguage(language: string) {
        this.currentLanguage = language.substr(0, 2).toLowerCase();
    }

    _replaceParams(value: string, paramsObj: any, addLineBreak: boolean = false): string {
        if (!paramsObj) return value;

        for (let key in paramsObj) {
            let replaceValue = paramsObj[key];
            value = value.replace(new RegExp("{" + key + "}", "ig"), replaceValue);
        }

        if (addLineBreak) value = value.replace(/\n/g, "<br>");

        return value;
    }
}

const localization = new Localization();
localization.init(require("../assets/localization.json"));

export default localization;
