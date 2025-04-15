import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CardCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <div style={{ marginTop: '40px' }}>
        <Slider {...settings}>
          {data.map((d) => (
            <div
              key={d.name}
              style={{
                backgroundColor: 'white',
                height: '320px',
                color: 'black',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '140px',
                  backgroundColor: '#6366f1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                }}
              >
                <img
                  src={d.img}
                  alt=""
                  style={{ height: '96px', width: '96px', borderRadius: '50%' }}
                />
              </div>
  
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: '600' }}>{d.name}</p>
                <p style={{ textAlign: 'center', fontSize: '12px' }}>{d.review}</p>
                <button
                  style={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    fontSize: '14px',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
  
}

const data = [
  {
    name: `John Morgan`,
    img: `/students/John_Morgan.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Ellie Anderson`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Nia Adebayo`,
    img: `/students/Nia_Adebayo.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Rigo Louie`,
    img: `/students/Rigo_Louie.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Mia Williams`,
    img: `/students/Mia_Williams.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  
];

export default CardCarousel;