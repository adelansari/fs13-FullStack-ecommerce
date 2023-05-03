import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

type SlideProps = {
    title: string;
};

const Slide = ({ title }: SlideProps) => {
    return (
        <div key={title} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={`/images/products/${title}.png`} alt={title} style={{ display: "block", maxHeight: 500 }} />
        </div>
    );
};

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: "0px",
    };

    const images = ["sphere-aalto2", "sphere-steam1", "cylinder-epic2", "cylinder-switch1", "cube-xbox1", "cube-aalto1", "cone-ubisoft1", "cone-switch1"];

    return (
        <>
            <Box display="flex" justifyContent="center" sx={{ p: 4, animation: "scale 2s infinite" }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 'bold',
                        textShadow: " -2px 0 black, 0 2px black, 0 0 10px white, 0 0 20px white, 0 0 30px white, 0 0 40px #ffa500, 0 0 70px #ffa500, 0 0 80px #ffa500, 0 0 100px #ffa500, 0 0 150px #ffa500",
                        animation: "shine 2s infinite",
                    }}
                >
                    Welcome!
                </Typography>
            </Box>
            <Box sx={{ bgcolor: "gray", backgroundImage: "url(/images/hero1.png)", backgroundSize: "cover" }}>
                <Slider {...settings}>
                    {images.map((image) => (
                        <Slide title={image} />
                    ))}
                </Slider>
            </Box>
        </>
    );
}
