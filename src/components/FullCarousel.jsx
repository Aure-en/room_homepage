import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { HashLink } from "react-router-hash-link";

// Images
import { ReactComponent as AngleLeft } from "../assets/icons/icon-angle-left.svg";
import { ReactComponent as AngleRight } from "../assets/icons/icon-angle-right.svg";
import { ReactComponent as Arrow } from "../assets/icons/icon-small-arrow.svg";

function FullCarousel() {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/images%2Fshop%2Fshop_main_1.jpg?alt=media&token=6955b061-b35e-445a-9c2f-7ea1b7389612",
    "https://firebasestorage.googleapis.com/v0/b/room-f191c.appspot.com/o/images%2Fshop%2Fshop_main_2.jpg?alt=media&token=6c2dfbbc-116b-4488-bd9b-c8001a4bc1a3",
  ];
  const text = [
    {
      title: "New Arrivals",
      text: "Discover our new furnitures and decorations.",
      link: "/shop/new_in",
    },
    {
      title: "Featured Designs",
      text: "Discover our designers' seasonal creations.",
      link: "/shop#featured",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Functions
  const next = () => {
    currentSlide === images.length - 1
      ? setCurrentSlide(0)
      : setCurrentSlide((prev) => prev + 1);
    setIsChanging(true);
  };

  const previous = () => {
    currentSlide === 0
      ? setCurrentSlide(images.length + 1)
      : setCurrentSlide((prev) => prev - 1);
    setIsChanging(true);
  };

  return (
    <Container>
      <CarouselComponent>
        <CSSTransition
          in={isChanging}
          timeout={500}
          classNames="fade"
          onEntered={() => setIsChanging(false)}
        >
          <>
            <Image src={images[currentSlide]} alt="Hero" />
            <Text>
              <Title>{text[currentSlide].title}</Title>
              <div>{text[currentSlide].text}</div>
              {text[currentSlide].link.includes("#") ? (
                <HashLink to={text[currentSlide].link}>
                  <ShopButton>
                    Shop now <Arrow />
                  </ShopButton>
                </HashLink>
              ) : (
                <Link to={text[currentSlide].link}>
                  <ShopButton>
                    Shop now <Arrow />
                  </ShopButton>
                </Link>
              )}
            </Text>
          </>
        </CSSTransition>

        <ButtonLeft type="button" onClick={previous}>
          <AngleLeft />
        </ButtonLeft>
        <ButtonRight type="button" onClick={next}>
          <AngleRight />
        </ButtonRight>

        <ImageButtons>
          {images.map((image, index) => (
            <ImageButton
              key={image}
              onClick={() => {
                setCurrentSlide(index);
                setIsChanging(true);
              }}
              isSelected={currentSlide === index}
              disabled={currentSlide === index}
            >
              {index + 1}
            </ImageButton>
          ))}
        </ImageButtons>
      </CarouselComponent>
    </Container>
  );
}

export default FullCarousel;


const colors = {
  arrow: "hsl(0, 0%, 100%)",
  button: "hsl(0, 0%, 27%)",
  buttonHover: "hsl(0, 0%, 5%)",
  text: "hsl(0, 0%, 0%)",
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  height: 80vh;
`;

const CarouselComponent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  position: absolute;
  top: 3rem;
  color: ${colors.arrow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  line-height: 2.5rem;
  text-align: center;
  padding: 0 1rem;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);

  @media all and (min-width: 768px) {
    left: 15%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.75rem;
    line-height: 3.25rem;
    align-items: flex-start;
  }
`;

const Title = styled.div`
  text-transform: uppercase;
  font-size: 2.5rem;
  letter-spacing: 3px;

  @media all and (min-width: 768px) {
    font-size: 3.75rem;
    letter-spacing: 6px;
  }
`;

const ShopButton = styled.span`
  background: ${colors.arrow};
  padding: 0 1rem;
  margin-top: 0.5rem;
  color: ${colors.button};
  text-transform: uppercase;
  font-size: 1.125rem;
  display: flex;
  align-items: center;
`;

const ImageButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;

  & > * {
    margin-left: 0.5rem;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

const ImageButton = styled.button`
  color: ${colors.arrow};
  font-family: "Playfair Display", sans-serif;
  font-size: ${(props) => (props.isSelected ? "1.25rem" : "1.125rem")};
  opacity: ${(props) => (props.isSelected ? "1" : ".75")};
  cursor: pointer;

  &:hover {
    font-size: ${(props) => !props.isSelected && "1.25rem"};
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${colors.button};
  padding: 1.5rem 1rem;
  cursor: pointer;
  color: ${colors.arrow};

  &:hover {
    background: ${colors.buttonHover};
  }
`;

const ButtonLeft = styled(Button)`
  left: 0;
`;

const ButtonRight = styled(Button)`
  right: 0;
`;

const Image = styled.img`
  width: 100vw;
  object-fit: cover;
  height: 100%;
  filter: brightness(70%);
`;
