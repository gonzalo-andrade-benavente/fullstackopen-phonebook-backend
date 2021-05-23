const palindrome = require('../utils/for_testing').palindrome;

describe('palindrome test', () => {
    
    test('palindrome of a', () => {
        const value = 'a';
        const result = palindrome(value);

        expect(result).toBe(value);
    });

    test('palindrome of react', () => {
        const value = 'react';
        const result = palindrome(value);

        expect(result).toBe('tcaer');
    });

    test('palindrome of releveler', () => {
        const result = palindrome('releveler')

        expect(result).toBe('releveler')
    });

});



