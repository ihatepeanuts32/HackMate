import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function CardCarousel({ data, isDarkMode }) {
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

  // Light mode styles
  const lightCardStyle = {
    backgroundColor: '#fff',
    height: '300px',
    color: '#222',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    border: '1px solid #ececec',
    transition: 'all 0.2s',
  };
  const lightHeaderStyle = {
    height: '60px',
    backgroundColor: '#C3A0FB',
    color: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    fontWeight: 600,
    fontSize: '18px',
    letterSpacing: '0.5px',
  };
  const lightBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
    backgroundColor: '#f7f7fa',
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    padding: '12px',
  };
  const lightButtonStyle = {
    backgroundColor: '#7a5cff',
    color: '#fff',
    fontSize: '14px',
    padding: '6px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    boxShadow: '0 1px 4px rgba(120,90,255,0.08)',
    transition: 'background 0.2s',
  };

  // Dark mode styles (original)
  const darkCardStyle = {
    backgroundColor: 'white',
    height: '300px',
    color: 'black',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };
  const darkHeaderStyle = {
    height: '60px',
    backgroundColor: '#6366f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  };
  const darkBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '120px',
    backgroundColor: '#1C0049',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
    padding: '12px',
  };
  const darkButtonStyle = {
    backgroundColor: '#6366f1',
    color: 'white',
    fontSize: '14px',
    padding: '4px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ width: '75%', margin: '0 auto' }}>
      <div style={{ marginTop: '40px' }}>
        <Slider {...settings}>
          {data?.map((d) => (
            <div
              key={d.id}
              style={isDarkMode ? darkCardStyle : lightCardStyle}
            >
              <div
                style={isDarkMode ? darkHeaderStyle : lightHeaderStyle}
              >
                <p style={{ margin: 0 }}>{d.name}</p>
              </div>
              <div
                style={isDarkMode ? darkBodyStyle : lightBodyStyle}
              >
                <div style={{
                  height: '50px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  marginBottom: '12px',
                  fontSize: '12px',
                  textAlign: 'center',
                  color: isDarkMode ? '#fff' : '#555',
                }}>
                  {d.description}
                </div>
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <button
                    style={isDarkMode ? darkButtonStyle : lightButtonStyle}
                    onClick={() => window.open(d.website, '_blank')}
                    onMouseOver={e => {
                      if (!isDarkMode) e.target.style.background = '#6847e6';
                    }}
                    onMouseOut={e => {
                      if (!isDarkMode) e.target.style.background = '#7a5cff';
                    }}
                  >
                    Read More
                  </button>
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