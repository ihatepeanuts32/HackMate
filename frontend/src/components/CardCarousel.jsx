import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CardCarousel({ data }) {
  console.log(data);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No hackathons available</div>;
  }
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
          {data?.map((d) => (
            <div
            key={d.id}
            style={{
              backgroundColor: 'white',
              height: '300px',
              color: 'black',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
            // title text below
              style={{
                height: '60px',
                backgroundColor: '#6366f1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
              }}
            >
              {/* image code below */}
              {/* <img
                src={d.logoUrl}
                alt={d.name}
                style={{ height: '96px', width: '96px', borderRadius: '50%' }}
              /> */}
              <p>{d.name}</p>
            </div>
            {/* body text below */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '120px', 
                backgroundColor: '#1C0049',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                padding: '12px',
              }}
            >
              <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0', textAlign: 'center' }}>
                {/* {d.name} */}
              </p>
              
              <div style={{ 
                height: '50px', 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                marginBottom: '12px',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                {d.description}
              </div>
              <div style={{
                marginTop: 'auto', 
                display: 'flex',
                justifyContent: 'center'
              }}> 
                {<button
                  style={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    fontSize: '14px',
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => window.open(d.website, '_blank')}
                >
                  Read More
                </button>}
              </div>
               </div>
           </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

// const dataa = [
//   {
//     name: `John Morgan`,
//     img: `/students/John_Morgan.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Ellie Anderson`,
//     img: `/students/Ellie_Anderson.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Nia Adebayo`,
//     img: `/students/Nia_Adebayo.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Rigo Louie`,
//     img: `/students/Rigo_Louie.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
//   {
//     name: `Mia Williams`,
//     img: `/students/Mia_Williams.jpg`,
//     review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
//   },
  
// ];

export default CardCarousel;