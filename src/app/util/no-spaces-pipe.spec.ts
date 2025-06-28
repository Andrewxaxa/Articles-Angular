import { NoSpacesPipe } from './no-spaces-pipe';

describe('NoSpacesPipe', () => {
  let pipe: NoSpacesPipe;

  beforeEach(() => {
    pipe = new NoSpacesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform spaces to dashes and lowercase the string', () => {
    expect(pipe.transform('Hello World')).toBe('hello-world');
    expect(pipe.transform('Angular Is Great')).toBe('angular-is-great');
  });

  it('should handle multiple spaces between words', () => {
    expect(pipe.transform('Too    many   spaces')).toBe('too-many-spaces');
  });

  it('should return empty string if input is empty', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle single word input', () => {
    expect(pipe.transform('TEST')).toBe('test');
  });

  it('should preserve special characters', () => {
    expect(pipe.transform('hello@world.com')).toBe('hello@world.com');
  });
});
