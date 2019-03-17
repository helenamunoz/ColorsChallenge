import { printableCustomerPreferences } from '../src/satisfyCustomers';

let input: string = "";

process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk : string) => {
    input += chunk;
    if (input.endsWith("\n\n") || input.endsWith("\r\n\r\n")){
        process.stdout.write(printableCustomerPreferences(input.trim()));
        process.exit(0);
    }
});

process.stdin.on('end', () => {
    process.stdout.write(printableCustomerPreferences(input.trim()));
});