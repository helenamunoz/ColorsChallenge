export enum ColorFinish{
    Mate,
    Gloss
}

export class ColorPreference {
    id: number;
    preference: ColorFinish

    public constructor(init?:Partial<ColorPreference>) {
        Object.assign(this, init);
    }
}