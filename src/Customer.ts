import { ColorPreference } from '../src/ColorPreference';

export class Customer{
    preferences: ColorPreference[];

    public constructor(init?:Partial<Customer>) {
        Object.assign(this, init);
    }
}