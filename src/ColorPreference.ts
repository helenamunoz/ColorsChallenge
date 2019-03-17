export enum ColorFinish{
    Mate,
    Gloss
}

/**
 * Used to store the finish preference for a given color
 */
export class ColorPreference {
    public id: number;
    public preference: ColorFinish

    public constructor(init?:Partial<ColorPreference>) {
        Object.assign(this, init);
    }
}