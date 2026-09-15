import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import {Swiper, SwiperProps, SwiperSlide, SwiperSlideProps} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';


function SwiperPortal({children, ...props}: SwiperProps ) {
    return <Swiper
       {...props}

        modules={[Navigation]}
    >
        {children}
    </Swiper>
}



function SwiperSlideWidget({children, ...props}: React.PropsWithChildren) {
    return <SwiperSlide>
        {children}
    </SwiperSlide>
}




export {
    SwiperPortal, SwiperSlideWidget
}

