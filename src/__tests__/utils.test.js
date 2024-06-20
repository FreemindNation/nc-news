import { capitaliseFirstLetter } from "../utils/capitalise-first-letter";
import { timeConverter } from "../utils/time-converter";





describe('timeConverter', () => {
  test('should convert a valid ISO string to a readable date-time format', () => {
    const input = "2020-11-22T11:13:00.000Z";
    const output = "2020-11-22 11:13:00";
    
    const result = timeConverter(input);

    expect(result).toBe(output);
  });

  test('should handle different valid ISO strings correctly', () => {
    const input = "2021-03-15T08:45:30.000Z";
    const output = "2021-03-15 08:45:30";

    const result = timeConverter(input);

    expect(result).toBe(output);
  });

  test('should handle midnight correctly', () => {
    const input = "2021-12-31T00:00:00.000Z";
    const output = "2021-12-31 00:00:00";

    const result = timeConverter(input);

    expect(result).toBe(output);
  });

  test('should handle noon correctly', () => {
    const input = "2021-12-31T12:00:00.000Z";
    const output = "2021-12-31 12:00:00";

    const result = timeConverter(input);

    expect(result).toBe(output);
  });

  test('should throwan error if passed an invalid ISO string', () => {
    const input = "invalid-string";

    expect(() => timeConverter(input)).toThrow(Error);
  });
});


describe('capitaliseFirstLetter', () => {
    test('returns an empty string if passed an empty string', () => {
        const input = '';
        const output = '';

        const result = capitaliseFirstLetter(input);

        expect(result).toBe(output)
    });

    test('returns a capitalised letter if passed a string of one lower case letter', () => {
        const input = 'a';
        const output = 'A';

        const result = capitaliseFirstLetter(input);

        expect(result).toBe(output)
    });

    test('returns a string with capitalised first letter if passed a string of lower case letters', () => {
        const input = 'water';
        const output = 'Water';

        const result = capitaliseFirstLetter(input);

        expect(result).toBe(output)
    });

    test('returns a string with capitalised first letter only if passed a string of all upper case letters', () => {
        const input = 'WATER';
        const output = 'Water';

        const result = capitaliseFirstLetter(input);

        expect(result).toBe(output)
    });
});