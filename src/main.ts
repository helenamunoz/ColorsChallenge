import { Customer } from './Customer';
import { ColorPreference, ColorFinish } from './ColorPreference';

export function getColorPreferences(customers: Customer[], colors:number): ColorPreference[]{
    const customerPreferences = satisfyCustomers(customers);
    
    let preferences: ColorPreference[] = [];
    for(let i=1; i<=colors; i++){
        const preference = customerPreferences.find(preference => preference.id == i);
        if (preference !== null){
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

    let moreThanMateCustomers: Customer[] = 
    customers.filter(customer => customer.preferences.length > 1 || customer.preferences[0].preference != ColorFinish.Mate);
    
    if (moreThanMateCustomers.length == customers.length){
        const colors = getColors(customers);
        return colors.map(color => new ColorPreference({id:color, preference:ColorFinish.Gloss}));
    }else {
        let onlyMateCustomers = 
        customers.filter(customer => !moreThanMateCustomers.some(moreThanMateCustomer => moreThanMateCustomer === customer));

        const mateColors = getColors(onlyMateCustomers);
        const matePreferences = mateColors.map(color => new ColorPreference({id:color, preference:ColorFinish.Mate}));

        const moreThanMateCustomerPreferences =
         satisfyCustomers(moreThanMateCustomers.map(customer => new Customer({preferences: customer.preferences.filter(preference => !mateColors.some(color => color == preference.id))})));

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
