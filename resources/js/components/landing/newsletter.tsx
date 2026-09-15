import { SubmitEvent, useRef } from 'react';
import { Button } from '../ui/button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useForm } from '@inertiajs/react';
import { store } from '@/routes/newsletter';

export default function Newsletter() {
    const container = useRef(null);
    const {
        data,
        processing,
        errors,
        wasSuccessful,
        hasErrors,
        setData,
        post,
        transform,
        submit,
    } = useForm('post', store().url, {
        email: '',
    });

    useGSAP(
        () => {
            gsap.utils.toArray('.animated').forEach((ring: any, index) => {
                gsap.from(ring, {
                    scrollTrigger: {
                        trigger: container.current,
                        toggleActions: 'restart',
                    },
                    stagger: index % 2 === 0 ? 0.1 : 0.3,
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'expo.out',
                    delay: index * 0.15,
                });
            });
        },
        { scope: container },
    );

    const handleSubmit = () => {
        try {
            submit({ preserveScroll: true });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <section
            className="border-t border-border/40 bg-brand-accent"
            id="newsletter"
            ref={container}
            dir="rtl"
        >
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center text-white">
                    <h2 className="animated text-3xl font-bold tracking-tight sm:text-4xl">
                        ابقَ على تواصل
                    </h2>
                    <p className="animated mt-4 text-white">
                        اشترك لتصلك مواقيت الصلاة اليومية، والتذكيرات الإسلامية،
                        وآخر التحديثات حول الفعاليات القادمة.
                    </p>
                    <div className="mt-8">
                        {hasErrors && (
                            <p className="text-green-500">{errors.email}</p>
                        )}
                        <form className="mx-auto flex max-w-md gap-3">
                            <input
                                dir="rtl"
                                type="email"
                                placeholder="أدخل بريدك الإلكتروني"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="animated flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white focus:ring-2 focus:ring-white/30 focus:outline-none"
                            />

                            <Button
                                type="button"
                                className="animated shrink-0 cursor-pointer bg-brand-accent-100 text-brand-accent hover:bg-brand-accent-50"
                                onClick={(e) => handleSubmit()}
                            >
                                اشترك
                            </Button>
                        </form>
                    </div>

                    <p className="animated mt-4 text-xs text-white">
                        لا رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.
                    </p>
                </div>
            </div>
        </section>
    );
}
