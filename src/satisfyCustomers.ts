import { Customer } from './Customer';
import { ColorPreference, ColorFinish } from './ColorPreference';
const NO_SOLUTION = "No solution exists";

export function printableCustomerPreferences(input: string) : string{
    const lines: string[] = input.split("\n");
    const colors:number = parseInt(lines[0]);
    
    if (isNaN(colors)){
        return NO_SOLUTION;
    }
    lines.shift();
    
    let customers: Customer[] = [];
    lines.forEach(line => {
        let customer = new Customer();
        const preferencePattern = /([1-9]+[0-9]*) ([G|M])/g;
        let match;
        do {
            match = preferencePattern.exec(line);
            if (match) {
                customer.preferences.push(new ColorPreference({id: parseInt(match[1]), preference: match[2] === 'G' ? ColorFinish.Gloss : ColorFinish.Mate}));
            }
        } while(match);

        customers.push(customer);
    });

    const preferences = getColorPreferences(customers, colors);
    if (preferences === undefined){
        return NO_SOLUTION;
    }

    let printablePreferences = preferences.map(customerPreference => customerPreference.preference === ColorFinish.Mate ? "M" : "G");
    return printablePreferences.join(" ");
}

function getColorPreferences(customers: Customer[], colors:number): ColorPreference[]{
    const customerPreferences = satisfyCustomers(customers);
    if (customerPreferences === undefined){
        return undefined;
    }

    let preferences: ColorPreference[] = [];
    for(let i=1; i<=colors; i++){
        const preference = customerPreferences.find(preference => preference.id === i);
        if (preference !== undefined){
            preferences.push(preference);
        }else{
            preferences.push(new ColorPreference({id: i, preference: ColorFinish.Gloss }));
        }
    }

    return preferences;
}

function satisfyCustomers(customers: Customer[]) : ColorPreference[]{
    if (customers.some(customer => customer.preferences.length == 0)){
        return undefined;
    }

    let customersSatisfiedByGlossy: Customer[] = 
    customers.filter(customer => customer.preferences.length > 1 || customer.preferences[0].preference != ColorFinish.Mate);
    
    if (customersSatisfiedByGlossy.length === customers.length){
        const colors = getColors(customers);
        return colors.map(color => new ColorPreference({id:color, preference:ColorFinish.Gloss}));
    }else {
        let onlyMateCustomers = 
        customers.filter(customer => customersSatisfiedByGlossy.indexOf(customer) === -1);

        const mateColors = getColors(onlyMateCustomers);
        const matePreferences = mateColors.map(color => new ColorPreference({id:color, preference:ColorFinish.Mate}));
        
        const moreThanMateCustomerPreferences =
         satisfyCustomers(customersSatisfiedByGlossy.map(customer => new Customer({preferences: customer.preferences.filter(preference => mateColors.indexOf(preference.id) === -1)})));

        if (moreThanMateCustomerPreferences !== undefined){
            return [...moreThanMateCustomerPreferences, ...matePreferences];
        }
    }

    return undefined;
}

function getColors(customers: Customer[]) : number[]{
    let colors: number[] = [];
    customers.forEach(customer => {
        customer.preferences.forEach(preference => {
            if (colors.indexOf(preference.id) === -1) {
                colors.push(preference.id);
            }
        });
    });

    return colors;
}
