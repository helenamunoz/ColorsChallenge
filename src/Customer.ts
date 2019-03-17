import { ColorPreference } from '../src/ColorPreference';

/**
 * Used to store the customer color preferences
 */
export class Customer{
    public preferences: ColorPreference[] = [];

    public constructor(init?:Partial<Customer>) {
        Object.assign(this, init);
    }
}