import Undderliner from '@/components/ui/underliner';
import { useScrollReveal } from '@/hooks/use-scrollreveal';
import { about, home } from '@/routes';
import { useRef, useEffect } from 'react';

export default function About() {
    const slideItemLeft = useRef(null);
    const slideItemRight = useRef(null);

    useEffect(() => {
        if (!slideItemLeft.current) return;

        useScrollReveal('left', slideItemLeft.current);
        useScrollReveal('right', slideItemRight.current);
    }, []);

    return (
        <div
            className="mx-5 my-10 flex max-w-7xl flex-col justify-start md:mx-auto"
            dir="rtl"
        >
            <div className="grid grid-flow-row grid-cols-12 gap-y-10 md:gap-x-10">
                <div
                    className="col-span-12 block md:col-span-6 md:hidden"
                    ref={slideItemLeft}
                >
                    <div className="flex items-center justify-center">
                        <img
                            src="/assets/images/about-us.png"
                            alt="About Alresoul Channel"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
                <div
                    className="col-span-12 flex flex-col justify-center md:col-span-6"
                    ref={slideItemRight}
                >
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-brand-accent">
                            قناة الرسول
                        </h1>
                        <div className="flex">
                            <Undderliner title="قناة الرسول" position="start" />
                        </div>
                    </div>
                    <p className="arabic-text text-2xl md:text-3xl">
                        إحدى نشاطات شركة إيكوميديا القطرية، انطلقت عام 2007،
                        واستطاعت أن تثبت مكانتها على الساحة الإعلامية بسمو
                        وعالمية رسالتها. وبما تقدمه من مساهمات بناءة فى خلق أسس
                        التفاعل بين الحضارات وتفعيل الحوار والتقارب بين الشعوب،
                        وإشاعة روح التسامح، من خلال برامجها الدينية الهادفة
                        وحواراتها مع كبار العلماء. كما تهدف إلى تسليط الضوء على
                        أخلاق النبى الكريم الفاضلة وتقديم أقواله وأوامره
                        وتعاليمه الإنسانية لتكون نبراساً يضيء الدرب للمؤمنين مع
                        التأكيد على الهوية الثقافية العربية والإسلامية باهتمامها
                        بالشعر والثقافة والحضارة والفن الإسلامي. وتقدم القناة
                        نمطاً إعلامياً هادفاً بما يلبي حاجة المشاهدين بعرض
                        مجموعة من البرامج الثقافية والأفلام الوثائقية والحوارات
                        الإسلامية الجادة، المعتدلة المنهج. وإبراز الجوانب
                        الثقافية والفكرية برؤية إعلامية عصرية ذات طابع إحترافي
                        ومهني ملتزم بمبادئ الدين الإسلامي الحنيف.
                    </p>
                </div>
                <div
                    className="col-span-12 hidden md:col-span-6 md:block"
                    ref={slideItemLeft}
                >
                    <div className="">
                        <img
                            src="/assets/images/about-us.png"
                            alt="About Alresoul Channel"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

About.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'من نحن',
            href: about().url,
        },
    ],
};
