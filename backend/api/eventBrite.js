import express from 'express';
const router = express.Router();

//Naomi - api that creates mock data of upcoming hackathons
router.get('/eventBriteHackathons', (req, res) => {
  const mockHackathons = [
    {
        "hackathons": [
          {
            "id": "ghw-api-2025",
            "name": "Global Hack Week: API",
            "startDate": "2025-04-11",
            "endDate": "2025-04-17",
            "location": "Everywhere, Online",
            "eventType": "Digital Only",
            "logoUrl": "https://example.com/logos/ghw-api.png",
            "website": "https://ghw.mlh.io/events/api-week",
            "description": "A worldwide virtual hackathon focused on API development and integration",
            "registrationDeadline": "2025-04-10",
            "prizes": {
              "total": "$10,000",
              "categories": ["Best API Integration", "Most Innovative Use of APIs", "Best Developer Experience"]
            },
            "organizer": "MLH",
            "tags": ["api", "online", "global", "beginner-friendly"]
          },
          {
            "id": "hackdavis-2025",
            "name": "HackDavis",
            "startDate": "2025-04-19",
            "endDate": "2025-04-20",
            "location": "Davis, CA",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackdavis.png",
            "website": "https://hackdavis.io",
            "description": "Create for social good",
            "registrationDeadline": "2025-04-12",
            "prizes": {
              "total": "$5,000",
              "categories": ["Social Good", "Sustainability", "Healthcare"]
            },
            "organizer": "UC Davis",
            "tags": ["social-impact", "california", "university", "sustainability"]
          },
          {
            "id": "hacktech-caltech-2025",
            "name": "Hacktech by Caltech",
            "startDate": "2025-04-25",
            "endDate": "2025-04-27",
            "location": "Pasadena, California",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hacktech.png",
            "website": "https://hack.caltech.edu/",
            "description": "Caltech's premier hackathon bringing together students from across the country",
            "registrationDeadline": "2025-04-18",
            "prizes": {
              "total": "$12,000",
              "categories": ["Best Overall", "Best Hardware Hack", "Best AI Application"]
            },
            "organizer": "Caltech",
            "tags": ["university", "california", "hardware", "AI"]
          },
          {
            "id": "la-hacks-2025",
            "name": "LA Hacks",
            "startDate": "2025-04-25",
            "endDate": "2025-04-27",
            "location": "Los Angeles, California",
            "venue": "Pauley Pavilion",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/lahacks.png",
            "website": "https://lahacks.com",
            "description": "One of the largest hackathons in the United States",
            "registrationDeadline": "2025-04-15",
            "prizes": {
              "total": "$25,000",
              "categories": ["Best Overall", "Most Creative", "Best Social Impact", "Best Design"]
            },
            "organizer": "UCLA",
            "tags": ["california", "university", "large-scale", "beginner-friendly"]
          },
          {
            "id": "dragonhacks-2025",
            "name": "DragonHacks 11",
            "startDate": "2025-04-26",
            "endDate": "2025-04-27",
            "location": "Philadelphia, PA",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/dragonhacks.png",
            "website": "https://dragonhacks.org",
            "description": "Drexel IEEE's annual hackathon for students in the Philadelphia area",
            "registrationDeadline": "2025-04-20",
            "prizes": {
              "total": "$3,000",
              "categories": ["Best Overall", "Best Hardware Hack", "Best First-Time Hackers"]
            },
            "organizer": "Drexel IEEE",
            "tags": ["philadelphia", "university", "hardware", "beginner-friendly"]
          },
          {
            "id": "hackdartmouth-2025",
            "name": "HackDartmouth",
            "startDate": "2025-04-26",
            "endDate": "2025-04-27",
            "location": "Hanover, New Hampshire",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackdartmouth.png",
            "website": "https://hack-dartmouth.org/",
            "description": "10th anniversary of Dartmouth College's annual hackathon",
            "registrationDeadline": "2025-04-19",
            "prizes": {
              "total": "$5,000",
              "categories": ["Best Overall", "Best Web App", "Best Use of APIs"]
            },
            "organizer": "Dartmouth College",
            "tags": ["new-hampshire", "university", "anniversary", "beginner-friendly"]
          },
          {
            "id": "jachacks-2025",
            "name": "JACHacks",
            "startDate": "2025-04-26",
            "endDate": "2025-04-27",
            "location": "Montreal, Pointe-Claire",
            "venue": "Library of John Abbott College",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/jachacks.png",
            "website": "https://jachacks.pages.dev/",
            "description": "Annual hackathon at John Abbott College in Montreal",
            "registrationDeadline": "2025-04-20",
            "prizes": {
              "total": "CAD $2,000",
              "categories": ["Best Overall", "Most Innovative", "Audience Choice"]
            },
            "organizer": "John Abbott College",
            "tags": ["montreal", "canada", "college", "beginner-friendly"]
          },
          {
            "id": "morganhacks-2025",
            "name": "MorganHacks",
            "startDate": "2025-04-26",
            "endDate": "2025-04-27",
            "location": "Baltimore, MD",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/morganhacks.png",
            "website": "https://morganhacks.com/",
            "description": "A hackathon focused on diversity in tech at Morgan State University",
            "registrationDeadline": "2025-04-19",
            "prizes": {
              "total": "$4,000",
              "categories": ["Best Overall", "Best Social Impact", "Best Beginner Hack"]
            },
            "organizer": "Morgan State University",
            "tags": ["baltimore", "university", "diversity", "hbcu"]
          },
          {
            "id": "gdsc-hacks-2025",
            "name": "GDSC Hacks",
            "startDate": "2025-05-02",
            "endDate": "2025-05-04",
            "location": "Guelph, Ontario",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/gdschacks.png",
            "website": "https://gdschacks.com",
            "description": "Google Developer Student Clubs hackathon at the University of Guelph",
            "registrationDeadline": "2025-04-25",
            "prizes": {
              "total": "CAD $3,000",
              "categories": ["Best Overall", "Best Use of Google Cloud", "Best UI/UX"]
            },
            "organizer": "GDSC Guelph",
            "tags": ["canada", "university", "google", "cloud"]
          },
          {
            "id": "hackupc-2025",
            "name": "HackUPC",
            "startDate": "2025-05-02",
            "endDate": "2025-05-04",
            "location": "Barcelona, Spain",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackupc.png",
            "website": "https://hackupc.com",
            "description": "700 hackers, 36h hackathon in Barcelona",
            "registrationDeadline": "2025-04-20",
            "prizes": {
              "total": "€10,000",
              "categories": ["Best Overall", "Best Hardware Hack", "Best Web App", "Best Mobile App"]
            },
            "organizer": "UPC Barcelona",
            "tags": ["europe", "spain", "university", "international"]
          },
          {
            "id": "ghw-opensource-2025",
            "name": "Global Hack Week: Open Source",
            "startDate": "2025-05-09",
            "endDate": "2025-05-15",
            "location": "Everywhere, Online",
            "eventType": "Digital Only",
            "logoUrl": "https://example.com/logos/ghw-opensource.png",
            "website": "https://ghw.mlh.io/events/open-source",
            "description": "A week-long virtual hackathon focused on contributing to open source projects",
            "registrationDeadline": "2025-05-08",
            "prizes": {
              "total": "$8,000",
              "categories": ["Best Open Source Contribution", "Most Impactful PR", "Best Documentation"]
            },
            "organizer": "MLH",
            "tags": ["open-source", "online", "global", "beginner-friendly"]
          },
          {
            "id": "jamhacks-9-2025",
            "name": "JAMHacks 9",
            "startDate": "2025-05-16",
            "endDate": "2025-05-18",
            "location": "Waterloo, Canada",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/jamhacks.png",
            "website": "https://jamhacks.ca",
            "description": "High school diversity hackathon in the Waterloo region",
            "registrationDeadline": "2025-05-10",
            "prizes": {
              "total": "CAD $2,500",
              "categories": ["Best Overall", "Best UI/UX", "Most Creative", "Best High School Team"]
            },
            "organizer": "JAMHacks",
            "tags": ["canada", "high-school", "diversity", "beginner-friendly"]
          },
          {
            "id": "nmit-hacks-2025",
            "name": "NMIT HACKS 2025",
            "startDate": "2025-05-16",
            "endDate": "2025-05-18",
            "location": "Bengaluru, Karnataka",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/nmithacks.png",
            "website": "https://nmithacks.com/",
            "description": "#CONNECTIONS FOR CHANGE - Annual hackathon at NMIT Bengaluru",
            "registrationDeadline": "2025-05-10",
            "prizes": {
              "total": "₹100,000",
              "categories": ["Best Overall", "Best Innovation", "Best Social Impact"]
            },
            "organizer": "NMIT Bengaluru",
            "tags": ["india", "university", "social-impact", "innovation"]
          },
          {
            "id": "hack-puebla-2025",
            "name": "Hack Puebla",
            "startDate": "2025-06-14",
            "endDate": "2025-06-15",
            "location": "Puebla, Mexico",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackpuebla.png",
            "website": "https://hackpuebla.mx",
            "description": "The premier hackathon in Puebla focusing on local innovation",
            "registrationDeadline": "2025-06-07",
            "prizes": {
              "total": "MXN $50,000",
              "categories": ["Best Overall", "Best Local Impact", "Most Innovative"]
            },
            "organizer": "Tech Puebla",
            "tags": ["mexico", "latin-america", "local-impact", "innovation"]
          },
          {
            "id": "hack-your-portfolio-2025",
            "name": "Hack Your Portfolio",
            "startDate": "2025-07-12",
            "endDate": "2025-07-14",
            "location": "Everywhere, Worldwide",
            "eventType": "Digital Only",
            "logoUrl": "https://example.com/logos/hackyourportfolio.png",
            "website": "https://hackyourportfolio.dev",
            "description": "A global online hackathon focused on building portfolio projects",
            "registrationDeadline": "2025-07-10",
            "prizes": {
              "total": "$5,000",
              "categories": ["Best Portfolio Project", "Most Creative", "Best UI/UX", "Best Technical Implementation"]
            },
            "organizer": "Portfolio Builders Network",
            "tags": ["portfolio", "career", "global", "online"]
          },
          {
            "id": "hack-the-6ix-2025",
            "name": "Hack the 6ix",
            "startDate": "2025-08-02",
            "endDate": "2025-08-04",
            "location": "Toronto, Ontario",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackthe6ix.png",
            "website": "https://hackthe6ix.com",
            "description": "Toronto's largest summer hackathon: network, learn, create a project, collaborate",
            "registrationDeadline": "2025-07-25",
            "prizes": {
              "total": "CAD $10,000",
              "categories": ["Best Overall", "Best Use of AI", "Best Health Tech", "Best Financial Tech"]
            },
            "organizer": "Hack the 6ix",
            "tags": ["toronto", "canada", "summer", "networking"]
          },
          {
            "id": "ghw-aiml-2025",
            "name": "Global Hack Week: AI/ML",
            "startDate": "2025-08-09",
            "endDate": "2025-08-15",
            "location": "Everywhere, Online",
            "eventType": "Digital Only",
            "logoUrl": "https://example.com/logos/ghw-aiml.png",
            "website": "https://globalhackweek.com/aiml",
            "description": "A week-long virtual hackathon focused on artificial intelligence and machine learning",
            "registrationDeadline": "2025-08-08",
            "prizes": {
              "total": "$15,000",
              "categories": ["Best AI Application", "Best ML Model", "Most Innovative Use of Data", "Best AI Ethics Project"]
            },
            "organizer": "MLH",
            "tags": ["ai", "ml", "data-science", "global", "online"]
          },
          {
            "id": "ghw-cloud-2025",
            "name": "Global Hack Week: Cloud",
            "startDate": "2025-09-05",
            "endDate": "2025-09-12",
            "location": "Everywhere, Online",
            "eventType": "Digital Only",
            "logoUrl": "https://example.com/logos/ghw-cloud.png",
            "website": "https://globalhackweek.com/cloud",
            "description": "A week-long virtual hackathon focused on cloud computing technologies",
            "registrationDeadline": "2025-09-04",
            "prizes": {
              "total": "$12,000",
              "categories": ["Best Cloud Architecture", "Best Serverless Application", "Best DevOps Implementation"]
            },
            "organizer": "MLH",
            "tags": ["cloud", "aws", "azure", "gcp", "serverless", "global", "online"]
          },
          {
            "id": "hack-the-north-2025",
            "name": "Hack the North",
            "startDate": "2025-09-13",
            "endDate": "2025-09-15",
            "location": "Waterloo, Ontario",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackthenorth.png",
            "website": "https://hackthenorth.com",
            "description": "Canada's biggest hackathon, bringing together 1,000+ students from around the world",
            "registrationDeadline": "2025-08-15",
            "prizes": {
              "total": "CAD $30,000",
              "categories": ["Best Overall", "Best Hardware Hack", "Best Use of AI", "Best Social Impact"]
            },
            "organizer": "University of Waterloo",
            "tags": ["canada", "waterloo", "international", "large-scale"]
          },
          {
            "id": "hophacks-2025",
            "name": "HopHacks",
            "startDate": "2025-09-13",
            "endDate": "2025-09-15",
            "location": "Baltimore, Maryland",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hophacks.png",
            "website": "https://hophacks.com",
            "description": "Johns Hopkins University's student-run hackathon",
            "registrationDeadline": "2025-09-05",
            "prizes": {
              "total": "$10,000",
              "categories": ["Best Overall", "Best Health Tech", "Best Social Good", "Best Design"]
            },
            "organizer": "Johns Hopkins University",
            "tags": ["baltimore", "university", "health-tech", "social-impact"]
          },
          {
            "id": "vthacks-2025",
            "name": "VTHacks",
            "startDate": "2025-09-13",
            "endDate": "2025-09-15",
            "location": "Blacksburg, Virginia",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/vthacks.png",
            "website": "https://vthacks.com",
            "description": "Virginia Tech's flagship hackathon",
            "registrationDeadline": "2025-09-06",
            "prizes": {
              "total": "$7,000",
              "categories": ["Best Overall", "Best Innovation", "Best UI/UX", "Best Hardware Hack"]
            },
            "organizer": "Virginia Tech",
            "tags": ["virginia", "university", "innovation", "technology"]
          },
          {
            "id": "hackmty-2025",
            "name": "HackMTY",
            "startDate": "2025-09-14",
            "endDate": "2025-09-15",
            "location": "Monterrey, Nuevo Leon",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackmty.png",
            "website": "https://hackmty.com",
            "description": "Largest student-run hackathon in Mexico",
            "registrationDeadline": "2025-09-07",
            "prizes": {
              "total": "MXN $100,000",
              "categories": ["Best Overall", "Best FinTech", "Best Social Impact", "Best Use of AI"]
            },
            "organizer": "Tecnológico de Monterrey",
            "tags": ["mexico", "monterrey", "latin-america", "student"]
          },
          {
            "id": "hack-the-mountains-2025",
            "name": "Hack The Mountains 5.0",
            "startDate": "2025-09-14",
            "endDate": "2025-09-15",
            "location": "Rajkot, Gujarat",
            "eventType": "Hybrid, In-Person Focus",
            "logoUrl": "https://example.com/logos/hackthemountains.png",
            "website": "https://hackthemountains.com",
            "description": "India's 5th international hackathon focusing on innovative solutions",
            "registrationDeadline": "2025-09-07",
            "prizes": {
              "total": "₹200,000",
              "categories": ["Best Overall", "Best Use of AI", "Best Hardware Hack", "Best Social Impact"]
            },
            "organizer": "HackTheCode Community",
            "tags": ["india", "gujarat", "international", "hybrid"]
          },
          {
            "id": "hackwestx-2025",
            "name": "HackWesTX",
            "startDate": "2025-09-14",
            "endDate": "2025-09-15",
            "location": "Lubbock, Texas",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackwestx.png",
            "website": "https://hackwestx.org",
            "description": "West Texas's premier hackathon experience",
            "registrationDeadline": "2025-09-07",
            "prizes": {
              "total": "$5,000",
              "categories": ["Best Overall", "Best Use of Cloud", "Most Innovative", "Best First-Time Hackers"]
            },
            "organizer": "Texas Tech University",
            "tags": ["texas", "university", "innovation", "southwest"]
          },
          {
            "id": "hackrice-2025",
            "name": "HackRice 14",
            "startDate": "2025-09-20",
            "endDate": "2025-09-22",
            "location": "Houston, Texas",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/hackrice.png",
            "website": "https://hack.rice.edu",
            "description": "Rice University's 14th annual hackathon with a retro gaming theme",
            "registrationDeadline": "2025-09-13",
            "prizes": {
              "total": "$8,000",
              "categories": ["Grand Prize", "Best Game", "Best Design", "Most Technically Impressive"]
            },
            "organizer": "Rice University",
            "tags": ["houston", "texas", "university", "gaming"]
          },
          {
            "id": "pennapps-2025",
            "name": "PennApps",
            "startDate": "2025-09-20",
            "endDate": "2025-09-22",
            "location": "Philadelphia, Pennsylvania",
            "eventType": "In-Person Only",
            "logoUrl": "https://example.com/logos/pennapps.png",
            "website": "https://pennapps.com",
            "description": "The original college hackathon, now in its XXV iteration",
            "registrationDeadline": "2025-08-20",
            "prizes": {
              "total": "$30,000",
              "categories": ["Grand Prize", "Best Hardware Hack", "Best Use of AI", "Best Health Hack", "Best Financial Technology"]
            },
            "organizer": "University of Pennsylvania",
            "tags": ["philadelphia", "ivy-league", "premiere", "international"]
          }
        ],
        "meta": {
          "total": 26,
          "page": 1,
          "perPage": 30,
          "totalPages": 1,
          "lastUpdated": "2025-04-15T12:00:00Z"
        }
      }
  ];

  res.json(mockHackathons);
});

export default router;
