export function inputLimit(input: string | null): string | null {
    if (input !== null && input.length > 20) {
      return `${input.slice(0, 20)}...`;
    }
    return input;
  }