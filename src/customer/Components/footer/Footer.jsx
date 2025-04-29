import { Grid, Link, Typography, TextField, Button, Box } from "@mui/material";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import NorthIcon from '@mui/icons-material/North';
import footerLogo from "../../../Data/logo/hanger_black_logo.png";

const footerImages = [
  "https://cdn.truesociety.com/uploads/2023/08/M23-ESS-D3823-INF17-Hot-Image-scaled.jpg",
  "https://www.timelessbridal.co.za/wp-content/uploads/2024/01/Ballina-sophia-tolli-wedding-dress-additional-view-min.jpg",
  "https://i.pinimg.com/236x/60/17/de/6017de7af94c2f173641f97d5d329fa5.jpg",
  "https://fabanza.com/media/catalog/product/cache/c26a0736877cb8c5e2d45478f82a04d0/anishka-creation/202306/beige-chiffon-satin-modern-indo-western-dress-fabku20776.jpg",
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f8f8f8", color: "black", mt: 10 }} className="footer">
      {/* Instagram & Newsletter Section */}
      <Grid container textAlign="center" justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight={700} mt={3}>
            Follow Products And Discounts On Instagram
          </Typography>
        </Grid>
        <Grid container item justifyContent="center" spacing={2} sx={{ my: 2, px: 2 }}>
          {footerImages.map((_, i) => (
            <Grid key={i} item>
              <img
                src={footerImages[i]}
                alt="Instagram Post"
                style={{ borderRadius: "5px", width: "220px", height: "200px", objectFit: "cover", cursor: "pointer", objectPosition: "top" }}
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
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 5, p: 6 }} className="bg-white">
        {/* Social Media & Copyright */}
        <Grid item xs={12} sm={4} textAlign="left">          
          <img src={footerLogo} alt="footer logo" className="w-14" />

          <p>Hanger: Quality styles to elevate your wardrobe. Thank you for shopping with us!</p>

          <div className="mt-5">
            {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, i) => (
              <Icon className="hover:scale-110 transition-all duration-300 ease-in-out" key={i} sx={{ fontSize: 22, mr: 4 }} />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={2.5} textAlign="start" mt="25px">
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Catalog
          </Typography>
          {["Necklaces", "Jewelry Box", "Shoes", "Jackets"].map((item) => (
            <Typography key={item} variant="body2" gutterBottom>
              {item}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} sm={2.5} textAlign="start" mt="25px">
          <Typography variant="h6" fontWeight={600} gutterBottom>
            About Us
          </Typography>
          {["Our Products", "Sitemap", "FAQ", "About Us", "Terms & Conditions"].map((item) => (
            <Typography key={item} variant="body2" gutterBottom>
              {item}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} sm={2.5} textAlign="start" mt="25px">
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Customer Service
          </Typography>
          {["Contact Us", "Track Your Order", "Product Care & Repair", "Book an Appointment", "Shipping & Returns"].map((item) => (
            <Typography key={item} variant="body2" gutterBottom>
              {item}
            </Typography>
          ))}
        </Grid>
      </Grid>



      <Grid item xs={12} textAlign="center" className="bg-black w-full flex justify-between gap-2 py-4 px-10 ">
        <Typography sx={{
          fontSize: "12px", color: "white", display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          &copy; 2025 Hanger. All rights reserved.
        </Typography>
        <div className="flex gap-3 justify-center items-center">
          <img src="https://pngimg.com/d/mastercard_PNG16.png" alt="Mastercard" className="w-7 h-6 object-contain" />
          <img src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" alt="Visa" className="w-7 h-6 object-contain" />
          <img src="https://static-00.iconduck.com/assets.00/amex-icon-2048x1286-jssggdy1.png" alt="Amex" className="w-7 h-6 object-contain" />
          <img src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png" alt="Discover" className="w-7 h-6 object-contain" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUfehmBr0Ko0aFuhXkh3_RjxQgNHm09MLi9Q&s" alt="PayPal" className="w-7 h-6 object-contain" />
          <img src="https://riataranch.com/wp-content/uploads/2017/04/klarna-logo.png" alt="Klarna" className="w-7 h-6 object-contain" />
        </div>

        <button className="w-[150px]">

          <Link href="#" sx={{ fontSize: "12px", color: "white" }}>
            <NorthIcon color="white" sx={{ fontSize: "16px", marginBottom: "4px" }} />
            Back to top
          </Link>
        </button>
      </Grid>

    </Box>
  );
};

export default Footer;