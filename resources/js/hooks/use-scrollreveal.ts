import ScrollReveal from 'scrollreveal';


type origin = 'left' | 'right' | 'bottom' | 'top'

export function useScrollReveal(origin: origin, target: any) {


    var slideType = {
        distance: '150%',
        origin: origin,
        opacity: 0.5,
    };

    ScrollReveal().reveal(target, slideType);
}
