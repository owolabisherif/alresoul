const arabicDigits: { [key: number]: string } = {
    0: '٠',
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
};

export const useArabicDigit = (num: number) => {
    let arabic_str = num
        .toString()
        .split('')
        .map((n) => arabicDigits[parseInt(n)]);

    return arabic_str.join('');
};
