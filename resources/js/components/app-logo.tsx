import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';
import LogoPrimary from '@/assets/logo-primary';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <LogoPrimary className="sifill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {name}
                </span>
            </div>
        </>
    );
}
