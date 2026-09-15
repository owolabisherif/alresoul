import { cn } from "@/lib/utils"

type Prop = {
    title: string
    className?: string
    position?: 'start' | 'center' | 'end'
}

export default function Undderliner({title, className, position = 'center'}: Prop) {
    return (
        <div className={cn("flex justify-center", className)}>
            <div className={cn("flex flex-col items", `items-${position}`)}>
                <h2 className={cn("mb-1 text-2xl font-bold capitalize", className)}>
                    {title}
                </h2>
                <div className="h-1.5 w-1/2 rounded-t-md bg-linear-90 from-brand-accent via-brand-secondary to-brand-accent-50"></div>
            </div>
        </div>
    )
}