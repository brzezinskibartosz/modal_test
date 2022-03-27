import { React, useState }  from 'react';
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { 
    ArrowRight, 
    ArrowLeft, 
    ServicesWrapper, 
    ServicesContainer,
    ServiceCard,
    TopLine,
    Heading,
    Subtitle,
    TextWrapper,
    ServicesH2,
    ServicesH3,
    ServiceBody,
    TrainingCard,
    UnderScore,
    Clock,
    Location,
    CourseElement
} from './TrainingsElements'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import MaxWidthDialog from '../modals/trainings/_trainings';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


const TrainingsSlider = (props) => {

    const [open, setOpen] = useState(false);

    const cards = [
        {
            id: 'Kurs_1',
            kind: 'Kurs_1',
            trainingDays: '2',
            location: 'ONLINE \n / U KLIENTA',
            key: "inbox",
            label: "Inbox",
            icon: InboxIcon,
            items: [{ key: "starred", label: "Starred", icon: StarBorder }]

        }, 
        {
            id: 'Kurs_2',
            kind: 'Kurs_2',
            trainingDays: '2',
            location: 'ONLINE',
            key: "new",
            label: "New",
            icon: InboxIcon,
            items: [{ key: "starred", label: "Starred", icon: StarBorder }]
        }, 
        {
            id: 'Kurs_3',
            kind: 'Kurs_3',
            subpage: '/',
            trainingDays: '2',
            location: 'ONLINE / STACJONARNIE'
        }
    ];


    const NextArrow = ({ onClick }) => {
        return (
            <ArrowRight onClick={onClick}>
                <BsArrowRight />
            </ArrowRight>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <ArrowLeft onClick={onClick}>
                <BsArrowLeft />
            </ArrowLeft>
        );
    };

    const settings = {
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: false,
        centerPadding: '50px',
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
                },
                {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    centerMode: true
                }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    centerMode: true
                }
                }
            ]
    };

    return (
        <ServicesContainer id='trainings'>
            <TextWrapper>
                <TopLine>KURSY</TopLine>
                <Heading>Poszerz możliwości zawodowe</Heading>
                <Subtitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Phasellus volutpat bibendum risus, et mollis dolor finibus sed. 
                    Aliquam volutpat magna blandit elit tincidunt, in elementum magna consequat. 
                </Subtitle>
            </TextWrapper>
            <ServicesWrapper>
                <TrainingCard {...settings}>
                    {cards.map((card) => (
                        <>
                            <ServiceCard>
                                <ServiceBody>
                                    <ServicesH2>{card.id}</ServicesH2>
                                    <CourseElement>
                                        <Clock />
                                        <ServicesH3>{card.trainingDays} DNI</ServicesH3>
                                    </CourseElement>
                                    <CourseElement>
                                        <Location />
                                        <ServicesH3>{card.location}</ServicesH3>
                                    </CourseElement>
                                    <UnderScore />
                                    <MaxWidthDialog 
                                        id={card.id}
                                        popupText={card.popupText}
                                        rightForm = {card.rightForm}
                                        rightText = {card.rightText}
                                        key = {card.key}
                                        label = {card.label}
                                    >
                                        openPopup={open}
                                        setOpenPopup={setOpen}
                                    </MaxWidthDialog >
                                </ServiceBody>
                            </ServiceCard>
                        </>
                    ))}
                </TrainingCard>
            </ServicesWrapper>
        </ServicesContainer>
    )
};


export default TrainingsSlider
