import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import NorthIcon from '@mui/icons-material/North';
import footerLogo from "../../../Data/logo/hanger_black_logo.png";
import { Link } from 'react-router-dom';

const footerImages = [
  "https://cdn.truesociety.com/uploads/2023/08/M23-ESS-D3823-INF17-Hot-Image-scaled.jpg",
  "https://www.timelessbridal.co.za/wp-content/uploads/2024/01/Ballina-sophia-tolli-wedding-dress-additional-view-min.jpg",
  "https://i.pinimg.com/236x/60/17/de/6017de7af94c2f173641f97d5d329fa5.jpg",
  "https://fabanza.com/media/catalog/product/cache/c26a0736877cb8c5e2d45478f82a04d0/anishka-creation/202306/beige-chiffon-satin-modern-indo-western-dress-fabku20776.jpg",
];

const footerAbout = [
  { label: "Our Products", path: "/products" },
  { label: "Sitemap", path: "/sitemap" },
  { label: "FAQ", path: "/faq" },
  { label: "About Us", path: "/about" },
  { label: "Terms & Conditions", path: "/terms-condition" }
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f8f8f8", color: "black", mt: 10 }} className="footer">
      {/* Instagram & Newsletter Section */}
      <Grid container textAlign="center" justifyContent="center" spacing={3} px={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              mt: { xs: 2, sm: 3 },
              mx: { xs: 2, sm: 4 },
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Follow Products And Discounts On Instagram
          </Typography>
        </Grid>
        <Grid container item justifyContent="center" spacing={2} sx={{ mb: 2, mx: 6 }}>
          {footerImages.map((_, i) => (
            <Grid key={i} item xs={6} sm={6} md={3}>
              <img
                src={footerImages[i]}
                alt="Instagram Post"
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  cursor: "pointer",
                  objectPosition: "top",
                  aspectRatio: "11 / 10", // optional to maintain a similar height
                }}
              />
            </Grid>

          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={700}>
            Or Subscribe To The Newsletter
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          <TextField
            variant="standard"
            placeholder="Email Address..."
            sx={{ width: "50%", input: { color: "black" } }}
          />
          <Button variant="text" sx={{ ml: 2, color: "black" }}>
            SUBMIT
          </Button>
        </Grid>
      </Grid>

      {/* Footer Links */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ pb: 5, mt: 6, px: { xs: 4, md: 6 } }} // Added margin-left here
        className="bg-white"
      >
        {/* Logo & Social Icons */}
        <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <img src={footerLogo} alt="footer logo" className="w-14 mx-auto sm:mx-0" />
          <p className="mt-2">Hanger: Quality styles to elevate your wardrobe. Thank you for shopping with us!</p>
          <div className="mt-5 flex justify-center sm:justify-start gap-4">
            {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, i) => (
              <Icon
                key={i}
                className="hover:scale-110 transition-all duration-300 ease-in-out"
                sx={{ fontSize: 22 }}
              />
            ))}
          </div>
        </Grid>

        {/* Catalog */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Catalog
          </Typography>
          {["Necklaces", "Jewelry Box", "Shoes", "Jackets"].map((item) => (
            <Typography key={item} variant="body2" gutterBottom>
              {item}
            </Typography>
          ))}
        </Grid>

        {/* About Us */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            About Us
          </Typography>
          {footerAbout.map(({ label, path }) => (
            <Typography key={label} variant="body2" gutterBottom component={Link} to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
              {label} <br />
            </Typography>
          ))}
        </Grid>

        {/* Customer Service */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Customer Service
          </Typography>
          {[
            "Contact Us",
            "Track Your Order",
            "Product Care & Repair",
            "Book an Appointment",
            "Shipping & Returns",
          ].map((item) => (
            <Typography key={item} variant="body2" gutterBottom>
              {item}
            </Typography>
          ))}
        </Grid>
      </Grid>


      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "black",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          py: 2,
          px: { xs: 2, sm: 6 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "10px", sm: "12px" },
            color: "white !important", // ensures the text color is white
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          &copy; 2025 Hanger. All rights reserved.
        </Typography>

        <div className="flex gap-3 justify-center items-center flex-wrap">
          <img
            src="https://pngimg.com/d/mastercard_PNG16.png"
            alt="Mastercard"
            className="w-7 h-6 object-contain"
          />
          <img
            src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png"
            alt="Visa"
            className="w-7 h-6 object-contain"
          />
          <img
            src="https://static-00.iconduck.com/assets.00/amex-icon-2048x1286-jssggdy1.png"
            alt="Amex"
            className="w-7 h-6 object-contain"
          />
          <img
            src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
            alt="Discover"
            className="w-7 h-6 object-contain"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfehmBr0Ko0aFuhXkh3_RjxQgNHm09MLi9Q&s"
            alt="PayPal"
            className="w-7 h-6 object-contain"
          />
          <img
            src="https://riataranch.com/wp-content/uploads/2017/04/klarna-logo.png"
            alt="Klarna"
            className="w-7 h-6 object-contain"
          />
        </div>

        <Link href="#">
          <a className="text-white no-underline text-sm flex items-center gap-1">
            <NorthIcon sx={{ fontSize: "16px", color: "white" }} />
            Back to top
          </a>
        </Link>
      </Grid>
    </Box>
  );
};

export default Footer;